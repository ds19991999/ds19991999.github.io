$(document).ready(function () {
  var $headerInner = $('.header-inner');
  var $sidebar = $('#sidebar');
  var getSidebarTop = function(){
    return $headerInner.height() + CONFIG.sidebar.offset;
  };
  var setSidebarMarginTop = function(sidebarTop){
    return $sidebar.css({ 'margin-top': sidebarTop });
  };
  var mql = window.matchMedia('(min-width: 991px)');
  setSidebarMarginTop(getSidebarTop()).show();
  mql.addListener(function(e){
    if(e.matches){
      setSidebarMarginTop(getSidebarTop());
    }
  });
});


/* 文章标题平移效果*/
jQuery(document).ready(function($){
$('.list-title a ,.entry-title a,.nav-single a,.widget ul li a').hover(function() {
$(this).stop().animate({'left': '10px'}, 'fast');
}, function() {
$(this).stop().animate({'left': '0px'}, 'fast');
});
});
