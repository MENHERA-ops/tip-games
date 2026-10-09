// Shared by every page: PayPal tip links and iframe auto-height for the Carrd embed.
(function(g){
  const PAYPAL_ID = "GCA6LB3DXBTAU"; // merchant account ID, keeps the email out of the page
  const PAYPAL_BIZ = "https://paypal.biz/menheramalice";
  function paypalUrl(amount){
    return "https://www.paypal.com/cgi-bin/webscr?" + new URLSearchParams({cmd:"_xclick", business:PAYPAL_ID, amount:String(amount), currency_code:"USD", item_name:"Cosplay fund tip", no_shipping:"1"}).toString();
  }
  const api = {PAYPAL_BIZ, paypalUrl};
  if(typeof module !== "undefined") module.exports = api;
  if(typeof window === "undefined") return;
  g.TipGames = api;
  function send(){ try{ parent.postMessage({type:"tipgames-height", h:document.documentElement.scrollHeight}, "*"); }catch(e){} }
  window.addEventListener("load", send);
  window.addEventListener("resize", send);
  if(window.ResizeObserver){ new ResizeObserver(send).observe(document.documentElement); }
  else setInterval(send, 1000);
})(this);
