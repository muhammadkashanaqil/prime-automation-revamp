'use client';
import { useState, useEffect, useRef, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Menu, MessageSquare, Send, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs, services } from './data';
import { LineReveal } from './scroll-motion';
import { ScrollSection } from './ambient-motion';
export function Reveal({children,className='',delay=0}:{children:ReactNode,className?:string,delay?:number}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.65,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>}
export function CTA({children='Book a free AI audit',href='/contact',secondary=false}:{children?:ReactNode,href?:string,secondary?:boolean}){return <Link className={`cta ${secondary?'secondary':''}`} href={href}>{children}<ArrowUpRight size={18}/></Link>}
export function Label({children}:{children:ReactNode}){return <p className="eyebrow"><span/> {children}</p>}
export function Header(){const [open,setOpen]=useState(false);const [scrolled,setScrolled]=useState(false);const path=usePathname();useEffect(()=>{const f=()=>setScrolled(window.scrollY>35);f();window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[]);const links=[['Services','/services'],['Work','/case-studies'],['About','/about'],['Insights','/insights']];return <header className={`header ${scrolled?'scrolled':''}`}><Link href="/" className="logo" aria-label="Prime Automation home"><Image src="/assets/prime-logo.png" alt="Prime Automation Pvt. Ltd." width={235} height={70} priority/></Link><nav aria-label="Main navigation">{links.map(([label,url])=><Link className={path.startsWith(url)?'active':''} href={url} key={url}>{label}</Link>)}</nav><div className="desktop-cta"><CTA/></div><Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button className="menu-toggle" aria-label="Open navigation"><Menu/></button></DialogTrigger><DialogContent className="mobile-menu"><DialogTitle>Prime Automation</DialogTitle><DialogDescription>Explore our expertise.</DialogDescription>{links.concat([['FAQ','/faq'],['Contact','/contact']]).map(([label,url])=><Link href={url} onClick={()=>setOpen(false)} key={url}>{label}<ArrowUpRight/></Link>)}</DialogContent></Dialog></header>}
export function Footer(){return <footer className="footer wrap"><div className="footer-top"><div><Link href="/" className="logo"><Image src="/assets/prime-logo.png" alt="Prime Automation" width={250} height={74}/></Link><p>Intelligence that moves<br/>your business forward.</p><a href="mailto:info@primeautomationpl.com">info@primeautomationpl.com <ArrowUpRight size={16}/></a></div><div><h3>Expertise</h3>{services.map(s=><Link key={s.slug} href={'/services/'+s.slug}>{s.short}</Link>)}</div><div><h3>Explore</h3>{[['Our work','/case-studies'],['About Prime','/about'],['Insights','/insights'],['FAQs','/faq'],['Start a conversation','/contact']].map(([t,h])=><Link key={h} href={h}>{t}</Link>)}</div></div><div className="giant-word" aria-hidden="true">PRIME<span>®</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Prime Automation Pvt. Ltd.</span><span>Built around your business.</span></div></footer>}
export function FinalCTA(){return <ScrollSection effect="zoom" className="final-cta wrap"><Reveal><Label>YOUR NEXT CHAPTER</Label><h2><LineReveal>Less manual work.</LineReveal><LineReveal delay={.1}><span>More possibility.</span></LineReveal></h2><p>Let’s find what’s slowing you down—and design the system that moves you forward.</p><CTA/><small>45-minute conversation. Practical next steps. No commitment.</small></Reveal></ScrollSection>}
export function FAQs({full=false}:{full?:boolean}){return <Accordion type="single" collapsible defaultValue="faq-0" className="faq-list">{faqs.slice(0,full?6:4).map(([q,a],i)=><AccordionItem value={'faq-'+i} key={q}><AccordionTrigger><span className="faq-num">0{i+1}</span>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion>}
export function PageHero({label,title,description}:{label:string,title:ReactNode,description?:string}){return <section className="page-hero wrap"><Reveal><Label>{label}</Label><h1>{title}</h1>{description&&<p>{description}</p>}</Reveal></section>}
export function ChatGuide(){
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState<{id:string;sender:'bot'|'user';text:string}[]>([
    {id:'welcome',sender:'bot',text:'Hi, welcome to Prime. Explore our services or find out what to expect from a free audit.'}
  ]);
  const [input,setInput]=useState('');
  const [loading,setLoading]=useState(false);
  const [sessionId,setSessionId]=useState('');
  const scrollRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    let sid='';
    try{sid=sessionStorage.getItem('prime-chat-session')||'';}catch{}
    if(!sid){sid=typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():`s-${Date.now()}`;try{sessionStorage.setItem('prime-chat-session',sid);}catch{}}
    setSessionId(sid);
  },[]);

  useEffect(()=>{
    if(scrollRef.current)scrollRef.current.scrollTop=scrollRef.current.scrollHeight;
  },[messages,loading]);

  async function respond(text:string){
    if(!text.trim()||loading)return;
    const userMsg={id:`u-${Date.now()}`,sender:'user' as const,text:text.trim()};
    setMessages(prev=>[...prev,userMsg]);
    setInput('');
    setLoading(true);
    try{
      const res=await fetch('/api/chat',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({message:text.trim(),sessionId,pageUrl:typeof window!=='undefined'?window.location.href:''}),
      });
      const data=await res.json();
      if(data.sessionId&&data.sessionId!==sessionId){
        setSessionId(data.sessionId);
        try{sessionStorage.setItem('prime-chat-session',data.sessionId);}catch{}
      }
      const reply=data.reply||data.error||'Thanks for reaching out! How else can I help?';
      setMessages(prev=>[...prev,{id:`b-${Date.now()}`,sender:'bot',text:reply}]);
    }catch{
      setMessages(prev=>[...prev,{id:`e-${Date.now()}`,sender:'bot',text:'Something went wrong. Please try again or visit our contact page.'}]);
    }finally{
      setLoading(false);
    }
  }

  return <>
    <button className="chat-launch" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close Prime guide':'Open Prime guide'}>{open?<X/>:<MessageSquare size={21}/>}</button>
    {open&&<aside className="chat-panel" aria-label="Prime website guide">
      <div className="chat-heading">
        <span>Prime guide<small>Services &amp; audit information</small></span>
        <button onClick={()=>setOpen(false)} aria-label="Close guide"><X size={18}/></button>
      </div>

      {/* Scrollable message history */}
      <div ref={scrollRef} className="chat-messages" style={{maxHeight:'280px',overflowY:'auto',display:'flex',flexDirection:'column',gap:'10px',marginBottom:'14px'}}>
        {messages.map(m=>(
          <div key={m.id} style={{
            alignSelf:m.sender==='user'?'flex-end':'flex-start',
            background:m.sender==='user'?'#c82aef':'#ffffff08',
            border:m.sender==='user'?'none':'1px solid #ffffff15',
            borderRadius:m.sender==='user'?'14px 14px 4px 14px':'14px 14px 14px 4px',
            padding:'12px 15px',
            maxWidth:'88%',
            fontSize:'13px',
            lineHeight:'1.65',
            color:m.sender==='user'?'#fff':'#d0d4dc',
            wordBreak:'break-word',
            whiteSpace:'pre-line',
          }}>{m.text}</div>
        ))}
        {loading&&<div style={{alignSelf:'flex-start',background:'#ffffff08',border:'1px solid #ffffff15',borderRadius:'14px 14px 14px 4px',padding:'12px 15px',fontSize:'13px',color:'#9b86a8'}}>Typing…</div>}
      </div>

      <div className="quick-prompts">
        {['What can you automate?','I want an AI agent','Book an audit'].map(t=>
          <button key={t} onClick={()=>respond(t)}>{t}<ArrowRight size={14}/></button>
        )}
      </div>
      <Link className="chat-contact" href="/contact" onClick={()=>setOpen(false)}>Talk to the team <ArrowUpRight size={16}/></Link>
      <form onSubmit={e=>{e.preventDefault();if(input.trim())respond(input)}}>
        <label className="sr-only" htmlFor="guide-message">Ask about Prime</label>
        <input id="guide-message" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about our services…"/>
        <button type="submit" aria-label="Send question" disabled={loading||!input.trim()}><Send size={18}/></button>
      </form>
      <small className="guide-note">Automated website guide</small>
    </aside>}
  </>;
}
