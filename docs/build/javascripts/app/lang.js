/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
!function(t){var e="shell",i=[],n=function(t){$.each(i,function(e,i){i.codeBlocks.length<=1||($.each(i.codeBlocks,function(e,i){i.hasClass(t)?i.show():i.hide()}),$(".code-selector .active").removeClass("active"),$('.code-selector [data-lang="'+t+'"]').addClass("active"))})},o=function(t){var e=$("<ul></ul>",{"class":"code-selector"});return $.each(t,function(t,i){var n=$("<li></li>"),o=$("<a></a>",{attr:{href:"#"+i,"data-lang":i},text:i});n.append(o),e.append(n)}),e};$(function(){var t=$(":not(pre) + pre");t.each(function(){for(var t=$(this),e=t.next(),n=[t];e.length&&"pre"==e.prop("tagName").toLowerCase();)n.push(e),e=e.next();if(n.length>1){var s=[];$.each(n,function(t,e){var i=e.attr("class").split(/\s/);$.each(i,function(t,e){"highlight"!==e&&s.push(e)})});var r=o(s);n[0].before(r)}i.push({codeBlocks:n})}),n(e),$(".page-wrapper").on("click",".code-selector a",function(t){t.preventDefault();var e=($(window),$(this)),i=e.offset().top;n($(this).data("lang")),i-=e.offset().top,$("window, body").scrollTop($(window).scrollTop()-i)})})}(window);