if (typeof title== "undefined"){title="YES";}
if (typeof imgheight== "undefined"){imgheight="116";}
if (typeof imgwidth== "undefined"){imgwidth="187";}
if (typeof lrfullwidth== "undefined"){lrfullwidth="560";}
if (typeof display== "undefined"){display="short";}
if (typeof ratio== "undefined"){ratio="1";}
if (typeof auto== "undefined"){auto="0";}
if (typeof type== "undefined"){type="";}

(function () {

	var location = 'https:';

if (widget=="authorWidget"){
document.write('<iframe name="widget" width="160" height="260" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?author=' +author+ '&widget=' +widget+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>');}
else if (widget=="NLFullWidget" || widget=="CNLFullWidget"){
if (!dir){var dir=""};
  if (dir=="TOPDOWN"){
    document.write('<iframe name="widget" width="200" height="900" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?list=' +list+ '&dir=' +dir+ '&ratio=' +ratio+ '&widget=' +widget+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>');}
  else {
    document.write('<iframe name="widget" width="'+lrfullwidth+'" height="200" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?list=' +list+ '&dir=' +dir+ '&ratio=' +ratio+ '&widget=' +widget+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>');}
  }
else if (widget=="singleBookWidget"){
	document.write('<iframe name="widget" width="160" height="260" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?isbn=' +isbn+ '&widget=' +widget+ '&title=' +title+ '&imgheight=' +imgheight+ '&imgwidth=' +imgwidth+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>');}
else if (widget=="NLPageWidget" || widget=="CNLPageWidget"){
	document.write('<iframe name="widget" width="' +width+ '" height="' +height+ '" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?list=' +list+ '&widget=' +widget+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="' +scroll+ '"></iframe>');}
else if (widget=="EVCWidget"){
	document.write('<iframe name="widget" id="widget" width="' +width+ '" height="' +height+ '" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?eventcode=' +eventcode+ '&type=' +type+ '&widget=' +widget+ '&auto='+ auto +'" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="auto"></iframe>');}
else if (widget=="EVWidget"){
	document.write('<iframe name="widget" width="' +width+ '" height="' +height+ '" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?eventcode=' +eventcode+ '&type=' +type+ '&widget=' +widget+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="auto"></iframe>');}
else if (widget=="CNLCarousel"){
	document.write('<iframe name="widget" width=100% height=355 frameborder="0" src="' + location + '//belldandy.booksite.com/bl-template/widgets/carousel.php?sid=' +sid+ '&list=' +list+'" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="auto"></iframe>');}
else if (widget=="EventWidget"){
	document.write('<iframe name="widget" id="widget" width="' +width+ '" height="' +height+ '" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?eventcode=' +eventcode+ '&type=' +type+ '&widget=' +widget+ '&auto='+ auto +'&display=' + display + '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="auto"></iframe>');}
else if (widget=="Message"){
	document.write('<iframe name="widget"  id="widget" width="' +width+ '" height="' +height+ '" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?msgcode=' +list+'&auto='+ auto +'" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="auto"></iframe>');}
else if ((widget=="NLWidget" || widget=="CNLWidget") && title=="NO"){
document.write('<iframe name="widget"  width="125" height="187" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?list=' +list+ '&widget=' +widget+ '&rotate=' +rotate+ '&fade=' +fade+ '&title=' +title+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>');}
else if (widget=="BLDWidget" && title=="NO") {
document.write('<iframe name="widget" width="125" height="187" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?widget=' +widget+ '&title=' +title+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>');}
else if (widget=="BLDWidget"){
document.write('<iframe name="widget" width="160" height="260" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?widget=' +widget+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>');}
else{
document.write('<iframe name="widget" width="160" height="260" frameborder="0" src="' + location + '//library.booksite.com/' +sid+ '/widgetloader/?list=' +list+ '&widget=' +widget+ '&rotate=' +rotate+ '&fade=' +fade+ '&title=' +title+ '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no"></iframe>');}

})();
