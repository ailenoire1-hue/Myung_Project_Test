// Shared typography, branding and page furniture for the company profile.
const PAL={bg:'#FFFFFF',ink:'#1C2C42',inkSoft:'#4F5E70',inkMute:'#697789',line:'#DCE2E9',tint:'#F4F6F8',accent:'#2456C4',accentSoft:'#F0F4FB',navy:'#1C2C42'};
const TYPE={display:72,chapter:60,title:48,subheading:28,body:24,caption:20,label:17};
const Em=({children,mark=false})=><strong data-key-point style={{fontSize:'inherit',fontWeight:650,color:PAL.accent,whiteSpace:'nowrap',background:mark?'linear-gradient(transparent 76%, #DFE9FF 76%)':'none'}}>{children}</strong>;
const TitleEm=({children})=><strong data-title-point style={{fontSize:'inherit',fontWeight:750,color:PAL.accent,whiteSpace:'nowrap'}}>{children}</strong>;
function emphasize(value,terms,Highlight=Em){
  const parts=[];let cursor=0;
  while(cursor<value.length){
    const match=terms.map(term=>({term,index:value.indexOf(term,cursor)})).filter(x=>x.index>=0).sort((a,b)=>a.index-b.index||b.term.length-a.term.length)[0];
    if(!match){parts.push(value.slice(cursor));break;}
    if(match.index>cursor)parts.push(value.slice(cursor,match.index));
    parts.push(<Highlight key={match.index}>{match.term}</Highlight>);cursor=match.index+match.term.length;
  }
  return parts;
}
const MingLogo=({size=18,showTag=false,dark=false})=><img src={window.PROFILE_ASSETS.logo} alt="㈜명정보기술" style={{display:'block',width:showTag?220:175,height:showTag?71:56,objectFit:'contain',objectPosition:'left center',filter:dark?'brightness(0) invert(1)':'none'}}/>;
const Chrome=({page,total=PROFILE_TOTAL,section,hideBottom=false,dark=false})=><>
  <header style={{position:'absolute',top:32,left:100,right:100,display:'flex',justifyContent:'space-between',alignItems:'center',height:68,zIndex:2}}><MingLogo dark={dark}/>{section&&<span style={{fontSize:17,fontWeight:500,color:dark?'#C5D2E1':PAL.inkSoft,letterSpacing:'-.02em'}}>{section}</span>}</header>
  {!hideBottom&&<footer style={{position:'absolute',left:100,right:100,bottom:28,color:dark?'#C5D2E1':PAL.inkMute}}><div style={{height:1,background:dark?'rgba(255,255,255,.25)':PAL.line,marginBottom:17}}><div style={{height:2,width:`${page/total*100}%`,background:dark?'#AFCBFF':PAL.accent}}/></div><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',fontSize:16,fontWeight:500}}><span>MYUNG INFORMATION TECHNOLOGIES</span><span style={{display:'flex',alignItems:'baseline',gap:12}}><strong style={{fontSize:20,color:dark?'#FFFFFF':PAL.ink,fontWeight:600}}>{String(page).padStart(2,'0')}</strong><span>/ {total}</span></span></div></footer>}
</>;
const Slide=({children,bg=PAL.bg,label,style={}})=><div data-screen-label={label} style={{width:1920,height:1080,background:bg,position:'relative',fontFamily:'SUIT, sans-serif',color:PAL.ink,overflow:'hidden',...style}}>{children}</div>;
const H1=({children,size=TYPE.display,color=PAL.ink,style={}})=><h1 style={{fontSize:size,fontWeight:750,lineHeight:1.25,letterSpacing:'-.025em',margin:0,color,...style}}>{children}</h1>;
const H2=({children,size=TYPE.title,color=PAL.ink,style={}})=><h2 style={{fontSize:size,fontWeight:750,lineHeight:1.25,letterSpacing:'-.025em',margin:0,color,...style}}>{children}</h2>;
const Kicker=({children,color=PAL.inkMute,style={}})=><div style={{fontSize:TYPE.label,fontWeight:600,letterSpacing:'.08em',lineHeight:1.4,color,...style}}>{children}</div>;
