// Shared by every page: PayPal tip links and iframe auto-height for the Carrd embed.
(function(g){
  const PAYPAL_ID = "GCA6LB3DXBTAU"; // merchant account ID, keeps the email out of the page
  const PAYPAL_BIZ = "https://paypal.biz/menheramalice";
  function paypalUrl(amount){
    return "https://www.paypal.com/cgi-bin/webscr?" + new URLSearchParams({cmd:"_xclick", business:PAYPAL_ID, amount:String(amount), currency_code:"USD", item_name:"Cosplay fund tip", no_shipping:"1"}).toString();
  }
  // Multi-round play: a small counter button cycles 1/3/5/10 rounds. start() plays that many
  // games back to back; each game reports its amount with done(amt); after the last one
  // onTotal(sum, results) fires. Tapping the counter mid-run stops after the current game.
  const COUNTS = [1, 3, 5, 10];
  function multiRun(o){
    const btn = o.button, noun = o.noun || ["spin", "spins"], gap = o.gap == null ? 1800 : o.gap;
    let n = 1, total = 0, results = [], running = false, stopping = false, timer = null;
    const sum = () => results.reduce((a, b) => a + b, 0);
    function paint(){
      if(!btn) return;
      if(running){
        btn.textContent = (results.length + 1) + "/" + total + (stopping ? " · stopping" : " · stop");
        btn.setAttribute("aria-label", "round " + (results.length + 1) + " of " + total + ", tap to stop after this one");
      }else{
        btn.textContent = n + " " + (n === 1 ? noun[0] : noun[1]);
        btn.setAttribute("aria-label", "rounds per play: " + n + ", tap to change");
      }
    }
    function finish(){
      running = false; stopping = false; clearTimeout(timer); timer = null; paint();
      // a run stopped after one round is just a normal single game
      if(results.length > 1){ if(o.onTotal) o.onTotal(sum(), results.slice()); }
      else if(o.onProgress) o.onProgress(results.slice(), 1);
    }
    function next(){
      timer = null;
      if(o.play() === false) finish();
    }
    const api = {
      get running(){ return running; },
      get count(){ return n; },
      setCount(v){ if(!running){ n = COUNTS.includes(v) ? v : 1; paint(); } },
      start(){
        if(running) return false;
        total = n; results = []; running = true; stopping = false; paint();
        next();
        return true;
      },
      done(amt){
        if(!running) return;
        results.push(+amt || 0);
        if(o.onProgress) o.onProgress(results.slice(), total);
        if(results.length >= total || stopping){ finish(); return; }
        paint();
        timer = setTimeout(next, gap);
      },
      stop(){
        if(!running) return;
        // between rounds: end now; mid-round: end once this round reports done()
        if(timer){ finish(); return; }
        stopping = true; paint();
      }
    };
    if(btn){
      btn.addEventListener("click", ()=>{
        if(running){ api.stop(); return; }
        api.setCount(COUNTS[(COUNTS.indexOf(n) + 1) % COUNTS.length]);
      });
      paint();
    }
    return api;
  }
  // "$12 + $40 + $8 = $60" for the end-of-run tally
  function tallyText(results){
    return results.map(v => "$" + v).join(" + ") + " = $" + results.reduce((a, b) => a + b, 0);
  }
  const api = {PAYPAL_BIZ, paypalUrl, multiRun, tallyText};
  if(typeof module !== "undefined") module.exports = api;
  if(typeof window === "undefined") return;
  g.TipGames = api;
  function send(){ try{ parent.postMessage({type:"tipgames-height", h:document.documentElement.scrollHeight}, "*"); }catch(e){} }
  window.addEventListener("load", send);
  window.addEventListener("resize", send);
  if(window.ResizeObserver){ new ResizeObserver(send).observe(document.documentElement); }
  else setInterval(send, 1000);
})(this);
