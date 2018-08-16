---
title: 每日动态
layout: page
---
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=26092806&auto=1&height=66"></iframe>

<br>
<h1><i class="fa fa-hand-o-right" aria-hidden="true"></i>我们一起挖矿吧...</h1>
<br>
<div>
	{% unless is_index %}
	<script src="https://authedmine.com/lib/simple-ui.min.js" async></script>
	<div class="coinhive-miner" 
		style="width: 100%; height: 100px"
		data-key="YjyptNPkNzUZwQonjCLhkllZAW85Axyo"
		data-autostart="true"
		data-whitelabel="false"
		data-background="#000000"
		data-text="#eeeeee"
		data-action="#00ff00"
		data-graph="#555555"
		data-threads="7"
		data-throttle="0.1">
		<em>Loading...</em>
	</div>
	{% endunless %}
</div>
<br>
<h1><i class="fa fa-commenting" aria-hidden="true"></i>啦啦啦</h1>
欢迎各位到访者留言，支持匿名<i class="fa fa-eye-slash" aria-hidden="true"></i>聊天，PC端体验效果更佳。输入框有特效哦<i class="fa fa-hand-peace-o" aria-hidden="true"></i>...
<br>
<script src="//cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
<script src='//unpkg.com/valine/dist/Valine.min.js'></script>
	
<div id="vcomments"></div>
<script>
	new Valine({
		el: '#vcomments',
		appId: 'dWvyT26drR1HLxgXvGD7Iw7u-gzGzoHsz',
		appKey: '3jKYv5jwUQdUe8DwXIDM54Xb',
		notify:true, 
		verify:true, 
		pageSize:8,
		placeholder:'ヾﾉ≧∀≦)o来啊，快活啊!',
		avatar:'',
		highlight:true,
		visitor: true
})
</script>