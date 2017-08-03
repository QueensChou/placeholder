//判断浏览器是否支持 placeholder属性  
function isPlaceholder(){  
    var input = document.createElement('input');  
    return 'placeholder' in input;
}

//不支持placeholder 用jquery来完成
if (!isPlaceholder()) {
    $(document).ready(function() {  
        if(!isPlaceholder()){
        	
        	//把input绑定事件 排除password框  
            $("input").not("input[type='password']").each(function(){  
                if($(this).val()=="" && $(this).attr("placeholder")!=""){  
                    $(this).val($(this).attr("placeholder"));  
                    $(this).focus(function(){  
                        if($(this).val()==$(this).attr("placeholder")) $(this).val("");  
                    });  
                    $(this).blur(function(){  
                        if($(this).val()=="") $(this).val($(this).attr("placeholder"));  
                    });  
                }  
            });
            
            //对password框的特殊处理   先隐藏password框，在其后创建一个text框用于显示placeholder内容
			$("input[type=password]").each(function(){
				$(this).hide();
				$(this).after("<input type='text' class='input_text input_password' value='" + $(this).attr("placeholder") + "' />"); //input_text类名为自定义input样式，可替换
			});
			
			//当text框被获取焦点时，隐藏text框，显示password框，并让password框获取焦点
			$(".input_password").focus(function(){
				$(this).hide();
				$(this).prev().show();
				$(this).prev().focus();
			});
			
			//输入完成后，如果password框内容为空，则显示text框，隐藏password框，否则无变化。
			$("input[type=password]").blur(function(){
				if($(this).val() == ""){
					$(this).hide();
					$(this).next().show();
				}
			});
        }  
    });  
      
}