#!/usr/bin/env python3
"""Builds Part 1 EPUB ebook for sale."""
import re, os
from ebooklib import epub

BASEDIR = os.path.dirname(os.path.abspath(__file__))
MDIR = os.path.join(BASEDIR, "manuscript")
OUT = os.path.join(BASEDIR, "Man Amongst the Clouds - Part I The Still Water.epub")
COVER = os.path.join(BASEDIR, "cover.png")

FILES = ["prologue.md"] + [f"chapter_{i:02d}.md" for i in range(1, 11)]

CSS = '''body{font-family:Georgia,serif;font-size:1.1em;line-height:1.7;color:#1a1a1a;padding:0 1em}
h1{font-size:1.5em;font-weight:bold;text-align:center;margin-top:3em;margin-bottom:.3em;letter-spacing:.12em;text-transform:uppercase}
h2{font-size:1.1em;font-weight:normal;font-style:italic;text-align:center;margin-top:0;margin-bottom:2em;color:#555}
p{text-indent:1.5em;margin:.2em 0;text-align:justify}
p.fp{text-indent:0}
p.sb{text-indent:0;text-align:center;margin:1.5em 0;letter-spacing:.5em;color:#888}
.tp{text-align:center;margin-top:8em}
.tp h1{font-size:1.8em;letter-spacing:.15em;margin-bottom:.3em}
.tp .sub{font-style:italic;color:#555;margin-bottom:2em}
.tp .pl{font-size:.9em;letter-spacing:.2em;text-transform:uppercase;color:#888;margin-bottom:.2em}
.tp .pn{font-size:1.3em;font-weight:bold;margin-bottom:2em}
.tp .au{font-size:1.15em}
.ph{text-align:center;margin-top:6em;margin-bottom:4em}
.ph h1{font-size:1.1em;letter-spacing:.25em;margin-bottom:.4em}
.ph h2{font-size:1.6em;font-weight:bold;font-style:normal;margin-bottom:1em;color:#1a1a1a}
.ph .ep{font-style:italic;font-size:.95em;color:#555;line-height:1.8}
.es{text-align:center;margin-top:4em}
.es .el{font-style:italic;color:#888;margin-bottom:3em}
.es h2{font-size:1.2em;font-weight:bold;font-style:normal;margin-bottom:1em;color:#1a1a1a}
.es p{text-indent:0;text-align:left;margin:.8em 0;font-size:.95em;line-height:1.6}
.cta{text-align:center;margin-top:2em;padding:1.2em;border:1px solid #c9a84c}
.cta p{text-align:center;margin:.4em 0}
.url{font-weight:bold;color:#8a6d1b;font-size:1.05em}
.cp p{text-indent:0;text-align:center;font-size:.85em;line-height:1.8;color:#666}'''

def md2html(fp):
    with open(fp,'r') as f: content=f.read()
    lines=content.split('\n'); parts=[]; title=""; sub=""; started=False; first=True
    for l in lines:
        s=l.strip()
        if not started:
            if s.startswith('# PART') or s.startswith('_"') or s.startswith('_\u201c'): continue
            elif s.startswith('# '): title=s[2:]; continue
            elif s.startswith('## '): sub=s[3:]; continue
            elif s=='---':
                if title or sub:
                    started=True
                    if title: parts.append(f'<h1>{title}</h1>')
                    if sub: parts.append(f'<h2>{sub}</h2>')
                    first=True
                continue
            else: continue
        if s=='---': parts.append('<p class="sb">*&#160;&#160;*&#160;&#160;*</p>'); first=True; continue
        if s.startswith('*End of Part') or s.startswith('_End of Part'): continue
        if s=='': continue
        t=re.sub(r'\*([^*]+)\*',r'<em>\1</em>',s)
        t=re.sub(r'_([^_]+)_',r'<em>\1</em>',t)
        if first: parts.append(f'<p class="fp">{t}</p>'); first=False
        else: parts.append(f'<p>{t}</p>')
    return '\n'.join(parts), title, sub

def wrap(body):
    return f'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><link rel="stylesheet" href="style/main.css" type="text/css"/></head><body>{body}</body></html>'

def main():
    book=epub.EpubBook()
    book.set_identifier('matc-part1-v1')
    book.set_title('Man Amongst the Clouds: Part I \u2014 The Still Water')
    book.set_language('en')
    book.add_author('Justin Cronk')
    book.add_metadata('DC','description','In a world where magic is memory, a boy discovers he can hear the world sing. Part I of a literary fantasy nine years in the making.')
    book.add_metadata('DC','subject','Fantasy')
    book.add_metadata('DC','rights','\u00a9 2026 Justin Cronk')
    book.add_metadata('DC','publisher','Stillfire Press')

    # Cover image
    with open(COVER, 'rb') as f:
        cover_data = f.read()
    book.set_cover('images/cover.png', cover_data)

    css=epub.EpubItem(uid="style",file_name="style/main.css",media_type="text/css",content=CSS.encode())
    book.add_item(css)
    spine=['nav']; toc=[]

    # Title page
    tp=epub.EpubHtml(title='Title Page',file_name='title.xhtml')
    tp.content=wrap('<div class="tp"><h1>Man Amongst<br/>the Clouds</h1><p class="sub">A Novel</p><p class="pl">Part I</p><p class="pn">The Still Water</p><p class="au">Justin Cronk</p></div>').encode()
    tp.add_item(css); book.add_item(tp); spine.append(tp)

    # Copyright
    cp=epub.EpubHtml(title='Copyright',file_name='copyright.xhtml')
    cp.content=wrap('<div class="cp"><p style="margin-top:6em">Man Amongst the Clouds: Part I \u2014 The Still Water</p><p>\u00a9 2026 Justin Cronk. All rights reserved.</p><p>Published by Stillfire Press</p><p>stillfirepress.com</p><p style="margin-top:1.5em">This is a work of fiction. Names, characters, places, and incidents<br/>are the product of the author\u2019s imagination or are used fictitiously.<br/>Any resemblance to actual persons, living or dead, events, or locales<br/>is entirely coincidental.</p><p style="margin-top:1.5em">First Digital Edition: March 2026</p><p>manamongsttheclouds.com</p></div>').encode()
    cp.add_item(css); book.add_item(cp); spine.append(cp)

    # Part header
    ph=epub.EpubHtml(title='Part I: The Still Water',file_name='part1.xhtml')
    ph.content=wrap('<div class="ph"><h1>Part I</h1><h2>The Still Water</h2><p class="ep">\u201cIn the time before the taking, the world sang to itself,<br/>and men were wise enough to listen.\u201d</p></div>').encode()
    ph.add_item(css); book.add_item(ph); spine.append(ph)

    # Chapters
    for i,fn in enumerate(FILES):
        fp=os.path.join(MDIR,fn)
        if not os.path.exists(fp): print(f"SKIP: {fn}"); continue
        html,title,sub=md2html(fp)
        dtitle=title if title else fn.replace('.md','').replace('_',' ').title()
        ch=epub.EpubHtml(title=dtitle,file_name=f'ch{i:02d}.xhtml')
        ch.content=wrap(html).encode()
        ch.add_item(css); book.add_item(ch); spine.append(ch); toc.append(ch)
        print(f"  {fn} -> {dtitle}")

    # End + teaser
    end=epub.EpubHtml(title='Continue the Journey',file_name='end.xhtml')
    end_html='''<div class="es">
<p class="el">End of Part I</p>
<h2>The Story Continues</h2>
<p>You have just read Part I of <em>Man Amongst the Clouds</em> \u2014 a five-part literary fantasy novel, nine years in the making.</p>
<p>Aelo\u2019s journey is only beginning. Ahead: the Ming monastery and its lake of ancient memory. The Core\u2019s underground cities and a Molder who can\u2019t feel his own hands. A woman on the coast who sees three futures and believes in none of them. A god disguised as a fisherman. And a king on an obsidian throne who has never heard the world sing.</p>
<p>The Knife is still hunting. The box is still fading. The Song is still waiting.</p>
<p><strong>The full novel is coming Fall 2026.</strong></p>
<div class="cta">
<p>Sign up for updates and be the first to know when the next part releases:</p>
<p class="url">manamongsttheclouds.com</p>
</div>
<p style="text-align:center;margin-top:3em;font-style:italic;color:#888">Thank you for being here at the beginning.</p>
</div>'''
    end.content=wrap(end_html).encode()
    end.add_item(css); book.add_item(end); spine.append(end)

    book.toc=toc
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())
    book.spine=spine
    epub.write_epub(OUT,book)
    print(f"\nEPUB saved: {OUT}")

if __name__=='__main__': main()
