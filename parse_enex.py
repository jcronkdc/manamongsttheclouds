#!/usr/bin/env python3
"""Parse Evernote .enex export and extract text content from each note."""

import xml.etree.ElementTree as ET
import re
import html
import os

def strip_html(text):
    """Remove HTML tags and decode entities."""
    # Remove CDATA wrappers
    text = re.sub(r'<!\[CDATA\[', '', text)
    text = re.sub(r'\]\]>', '', text)
    # Remove XML declaration and DOCTYPE
    text = re.sub(r'<\?xml[^>]*\?>', '', text)
    text = re.sub(r'<!DOCTYPE[^>]*>', '', text)
    # Remove en-note tags
    text = re.sub(r'</?en-note[^>]*>', '', text)
    # Replace br and div/p tags with newlines
    text = re.sub(r'<br[^>]*/?>','\n', text)
    text = re.sub(r'</(?:div|p|li|tr|h[1-6])>', '\n', text)
    text = re.sub(r'<(?:div|p)[^>]*>', '\n', text)
    # Remove all remaining HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Decode HTML entities
    text = html.unescape(text)
    # Clean up whitespace
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n[ \t]+', '\n', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def parse_enex(filepath):
    """Parse .enex file and return list of notes."""
    notes = []
    
    # Parse the XML
    tree = ET.parse(filepath)
    root = tree.getroot()
    
    for note_elem in root.findall('note'):
        title_elem = note_elem.find('title')
        title = title_elem.text if title_elem is not None else 'Untitled'
        
        created_elem = note_elem.find('created')
        created = created_elem.text if created_elem is not None else ''
        
        updated_elem = note_elem.find('updated')
        updated = updated_elem.text if updated_elem is not None else ''
        
        content_elem = note_elem.find('content')
        content = ''
        if content_elem is not None and content_elem.text:
            content = strip_html(content_elem.text)
        
        # Get source URL if any
        source_url = ''
        attrs = note_elem.find('note-attributes')
        if attrs is not None:
            src = attrs.find('source-url')
            if src is not None and src.text:
                source_url = src.text
        
        notes.append({
            'title': title,
            'created': created,
            'updated': updated,
            'content': content,
            'source_url': source_url
        })
    
    return notes

def main():
    filepath = '/Users/justincronk/Desktop/Man Amongst the Clouds/Man Amongst The Clouds.enex'
    notes = parse_enex(filepath)
    
    output_dir = '/Users/justincronk/Desktop/Man Amongst the Clouds/extracted_notes'
    os.makedirs(output_dir, exist_ok=True)
    
    # Write each note to a separate file
    for i, note in enumerate(notes):
        # Create safe filename
        safe_title = re.sub(r'[^\w\s-]', '', note['title'])[:80].strip()
        if not safe_title:
            safe_title = f'note_{i}'
        filename = f"{i:02d}_{safe_title}.txt"
        
        with open(os.path.join(output_dir, filename), 'w', encoding='utf-8') as f:
            f.write(f"TITLE: {note['title']}\n")
            f.write(f"CREATED: {note['created']}\n")
            f.write(f"UPDATED: {note['updated']}\n")
            if note['source_url']:
                f.write(f"SOURCE: {note['source_url']}\n")
            f.write(f"\n{'='*60}\n\n")
            f.write(note['content'])
        
    # Also write a master summary
    with open(os.path.join(output_dir, '_ALL_NOTES_COMBINED.txt'), 'w', encoding='utf-8') as f:
        for i, note in enumerate(notes):
            f.write(f"\n{'#'*70}\n")
            f.write(f"## NOTE {i+1}: {note['title']}\n")
            f.write(f"## Created: {note['created']}\n")
            if note['source_url']:
                f.write(f"## Source: {note['source_url']}\n")
            f.write(f"{'#'*70}\n\n")
            f.write(note['content'])
            f.write(f"\n\n")
    
    print(f"Extracted {len(notes)} notes to {output_dir}")
    for i, note in enumerate(notes):
        content_preview = note['content'][:100].replace('\n', ' ')
        print(f"  {i+1}. [{note['title']}] - {len(note['content'])} chars - {content_preview}...")

if __name__ == '__main__':
    main()
