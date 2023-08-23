/**
 * 小票查询结果js
 */
        // 删除预处理
	    function receiptDeleteOne(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	$("#receiptModalBody").text(id);
	    	$("#modelConfirm").attr("onclick","doReceiptDeleteOne("+id+")");
	    	$("#showModelButton").click();
	    }
	    
	    // 执行删除
	    function doReceiptDeleteOne(id){
	    	$("#modelConfirm").attr("onclick","");
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/shopping/receiptDeleteOne/"+id,
	    		  data: "",
	    		  dataType: "json",
	    		  success: function(result){
					   if(result.success){
						  afterDoReceiptDeleteOne(id);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("删除失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    	
	    }
	    
	    // 删除后处理
	    function afterDoReceiptDeleteOne(id){
	    	$("#tr"+id).addClass("text-danger");
	    	$("#tr"+id).hide(1200);
	    }
	    
	    // 修改预处理
	    function receiptModify(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	$("#receiptModifyCancel"+id).show();
	    	$("#receiptModifyConfirm"+id).show();
	    	$("#receiptModify"+id).hide();
	    	$("#receiptDeleteOne"+id).hide();
	    	$("#shopping_result_table").attr("style","width:150%;");
	    	
	    	// 取旧值
	    	var realNameOld = $("#realName"+id).text();
	    	var packNameOld = $("#packName"+id).text();
	    	var productNameOld = $("#productName"+id).text();
	    	var quantityOld = $("#quantity"+id).text();
	    	var weightOld = $("#weight"+id).text();
	    	var unitPriceOld = $("#unitPrice"+id).text();
	    	var totalPriceOld = $("#totalPrice"+id).text();
	    	var unitOfPriceOld = $("#unitOfPrice"+id).text();
	    	var vatOld = $("#vat"+id).text();
	    	var categoryOld = $("#category"+id).text();
	    	var marketNameOld = $("#marketName"+id).text();
	    	var customerReceiptIdOld = $("#customerReceiptId"+id).attr("data-id");
	    	    customerReceiptIdOld = (customerReceiptIdOld == '0')?'':customerReceiptIdOld;
	    	var mailingAddressIdOld = $("#mailingAddressId"+id).attr("data-id");
	    	    mailingAddressIdOld = (mailingAddressIdOld == '0')?'':mailingAddressIdOld;
	    	var companyInformationIdOld = $("#companyInformationId"+id).attr("data-id");
	    	    companyInformationIdOld = (companyInformationIdOld == '0')?'':companyInformationIdOld;
	    	var transactionDateOld = $("#transactionDate"+id).text();
	    	
	    	// 时区问题处理
	    	var tzoffset = (new Date()).getTimezoneOffset() * 60000
	    	const transactionDateOldFormat = new Date(new Date(transactionDateOld)-tzoffset).toISOString().substring(0, 19);
	    	
	    	// 变为输入框
	    	$("#realName"+id).html('<input type="text" id="realNameInput'+id+'" value="'+realNameOld+'" style="width:100%" />');
	    	$("#packName"+id).html('<input type="text" id="packNameInput'+id+'" value="'+packNameOld+'" style="width:100%" />');
	    	$("#productName"+id).html('<input type="text" id="productNameInput'+id+'" value="'+productNameOld+'" style="width:100%" />');
	    	$("#quantity"+id).html('<input type="number" id="quantityInput'+id+'" value="'+quantityOld+'" step="1"  min="1" max="999" style="width:100%"/>');
	    	$("#weight"+id).html('<input type="number" id="weightInput'+id+'" value="'+weightOld+'" step="0.001"  min="0.001" max="999" style="width:100%"/>');
	    	$("#unitPrice"+id).html('<input type="number" id="unitPriceInput'+id+'" value="'+unitPriceOld+'" step="0.01"  min="0.00" max="999999" style="width:100%"/>');
	    	$("#totalPrice"+id).html('<input type="number" id="totalPriceInput'+id+'" value="'+totalPriceOld+'" step="0.01"  min="0.00" max="999999" style="width:100%"/>');
	    	$("#unitOfPrice"+id).html('<input type="text" id="unitOfPriceInput'+id+'" value="'+unitOfPriceOld+'" style="width:100%" />');
	    	$("#vat"+id).html('<input type="number" id="vatInput'+id+'" value="'+vatOld+'" step="0.01"  min="0.00" max="999" style="width:100%"/>');
	    	$("#category"+id).text(''); // 在ShowMain页面无法修改类别
	    	$("#marketName"+id).html('<input type="text" id="marketNameInput'+id+'" value="'+marketNameOld+'" style="width:100%" />');
	    	$("#customerReceiptId"+id).html('<input type="text" id="customerReceiptIdInput'+id+'" value="'+customerReceiptIdOld+'" style="width:100%" />');
	    	$("#mailingAddressId"+id).html('<input type="text" id="mailingAddressIdInput'+id+'" value="'+mailingAddressIdOld+'" style="width:100%" />');
	    	$("#companyInformationId"+id).html('<input type="text" id="companyInformationIdInput'+id+'" value="'+companyInformationIdOld+'" style="width:100%" />');
	    	$("#transactionDate"+id).html('<input type="datetime-local" id="transactionDateInput'+id+'" value="'+transactionDateOldFormat+'" step="1" />');
	    	
	    	// 为 取消修改 做准备
	    	$("#receiptModifyCancel"+id).attr("onclick","receiptModifyCancel('"+id+"',event,'"+realNameOld+"','"+packNameOld+"','"
	    	        +productNameOld+"','"+quantityOld+"','"+weightOld+"','"+unitPriceOld+"','"+totalPriceOld+"','"+unitOfPriceOld
	    	        +"','"+vatOld+"','"+categoryOld+"','"+marketNameOld+"','"+customerReceiptIdOld+"','"+mailingAddressIdOld+"','"
	    	        +companyInformationIdOld+"','"+transactionDateOld+"')");
	    	
	    }
	    
	    // 取消修改
	    function receiptModifyCancel(id,event,realNameOld,packNameOld,productNameOld,quantityOld,weightOld,unitPriceOld,totalPriceOld,unitOfPriceOld,vatOld,
	                                 categoryOld,marketNameOld,customerReceiptIdOld,mailingAddressIdOld,companyInformationIdOld,transactionDateOld){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	$("#receiptModifyCancel"+id).hide();
	    	$("#receiptModifyConfirm"+id).hide();
	    	$("#receiptModify"+id).show();
	    	$("#receiptDeleteOne"+id).show();
	    	$("#shopping_result_table").attr("style","width:140%;");
	    	
	    	$("#realName"+id).text(realNameOld);
	    	$("#packName"+id).text(packNameOld);
	    	$("#productName"+id).text(productNameOld);
	    	$("#quantity"+id).text(quantityOld);
	    	$("#weight"+id).text(weightOld);
	    	$("#unitPrice"+id).text(unitPriceOld);
	    	$("#totalPrice"+id).text(totalPriceOld);
	    	$("#unitOfPrice"+id).text(unitOfPriceOld);
	    	$("#vat"+id).text(vatOld);
	    	$("#category"+id).text(categoryOld);
	    	$("#marketName"+id).text(marketNameOld);
	    	
	    	if(customerReceiptIdOld==""){
		        $("#customerReceiptId"+id).text("");
	        }else{
		        $("#customerReceiptId"+id).html("<a href='/customerReceipt/query/"+customerReceiptIdOld+"' target='_blank'>点击查看</a>");
	        }
	    	
	    	if(mailingAddressIdOld==""){
		        $("#mailingAddressId"+id).text("");
	        }else{
		        $("#mailingAddressId"+id).html("<a href='/mailingAddress/query/"+mailingAddressIdOld+"' target='_blank'>点击查看</a>");
	        }
	    	
	    	if(companyInformationIdOld==""){
		        $("#companyInformationId"+id).text("");
	        }else{
		        $("#companyInformationId"+id).html("<a href='/companyInfo/query/"+companyInformationIdOld+"' target='_blank'>点击查看</a>");
	        }
	        
	    	$("#transactionDate"+id).text(transactionDateOld);
	    	
	    }
	    
	    // 确定修改
	    function receiptModifyConfirm(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return false;
	    	
	    	// 取值
	    	var realName = $("#realNameInput"+id).val();
	    	var packName = $("#packNameInput"+id).val();
	    	var productName = $("#productNameInput"+id).val();
	    	var quantity = $("#quantityInput"+id).val();
	    	var weight = $("#weightInput"+id).val();
	    	var unitPrice = $("#unitPriceInput"+id).val();
	    	var totalPrice = $("#totalPriceInput"+id).val();
	    	var unitOfPrice = $("#unitOfPriceInput"+id).val();
	    	var vat = $("#vatInput"+id).val();
	    	// var category = null;
	    	var marketName = $("#marketNameInput"+id).val();
	    	var customerReceiptId = $("#customerReceiptIdInput"+id).val();
	    	var mailingAddressId = $("#mailingAddressIdInput"+id).val();
	    	var companyInformationId = $("#companyInformationIdInput"+id).val();
	    	var transactionDate = $("#transactionDateInput"+id).val();
	    	
	    	// 生成FormData数据，像表单一样传输和解析
	    	var receiptJson = {"id":id,"realName":realName,"packName":packName,"productName":productName,"quantity":quantity,"weight":weight,"unitPrice":unitPrice,
   			                   "totalPrice":totalPrice,"unitOfPrice":unitOfPrice,"vat":vat,"marketName":marketName,"customerReceiptId":customerReceiptId,
			                   "mailingAddressId":mailingAddressId,"companyInformationId":companyInformationId,"transactionDate":transactionDate};
	    	var formData = new FormData();
	    	for ( var key in receiptJson ) {
	    		formData.append(key, receiptJson[key]);
	    	}
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/shopping/receiptModify",
	    		  data: formData,      // 要发送的数据
	    		  contentType:false,   // 默认为 application/x-www-form-urlencoded; charset=UTF-8
	    		  processData:false,   // 默认为true，会把数据解析为query字符串，对应于contentType的默认值
	    		  dataType: "json",    // 要接收的数据类型
	    		  success: function(result){
					   if(result.success){
						  afterReceiptModifyConfirm(result);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("修改失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    }
	    
	    // 修改后处理
	    function afterReceiptModifyConfirm(result){
	    	var id = result.id;
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	// 修改页面显示
	    	$("#realName"+id).text(result.realName);
	    	$("#packName"+id).text(result.packName);
	    	$("#productName"+id).text(result.productName);
	    	$("#quantity"+id).text(result.quantity);
	    	$("#weight"+id).text(result.weight);
	    	$("#unitPrice"+id).text(result.unitPrice);
	    	$("#totalPrice"+id).text(result.totalPrice);
	    	$("#unitOfPrice"+id).text(result.unitOfPrice);
	    	$("#vat"+id).text(result.vat);
	    	$("#category"+id).text(result.category);
	    	$("#marketName"+id).text(result.marketName);
	    	
	    	var customerReceiptId = result.customerReceiptId;
	    	if(customerReceiptId==null || customerReceiptId==""){
		        $("#customerReceiptId"+id).text("");
		        $("#customerReceiptId"+id).attr("data-id","0");
	        }else{
		        $("#customerReceiptId"+id).html("<a href='/customerReceipt/query/"+customerReceiptId+"' target='_blank'>点击查看</a>");
	            $("#customerReceiptId"+id).attr("data-id",customerReceiptId);
	        }
	    	var mailingAddressId = result.mailingAddressId;
	    	if(mailingAddressId==null || mailingAddressId==""){
		        $("#mailingAddressId"+id).text("");
		        $("#mailingAddressId"+id).attr("data-id","0");
	        }else{
		        $("#mailingAddressId"+id).html("<a href='/mailingAddress/query/"+mailingAddressId+"' target='_blank'>点击查看</a>");
	            $("#mailingAddressId"+id).attr("data-id",mailingAddressId);
	        }
	    	var companyInformationId = result.companyInformationId;
	    	if(companyInformationId==null || companyInformationId ==""){
		        $("#companyInformationId"+id).text("");
		        $("#companyInformationId"+id).attr("data-id","0");
	        }else{
		        $("#companyInformationId"+id).html("<a href='/companyInfo/query/"+companyInformationId+"' target='_blank'>点击查看</a>");
	            $("#companyInformationId"+id).attr("data-id",companyInformationId);
	        }
	        
	    	$("#transactionDate"+id).text(result.transactionDate);
	    	
	    	$("#tr"+id).addClass("text-success");
	    	
	    	$("#receiptModifyCancel"+id).hide();
	    	$("#receiptModifyConfirm"+id).hide();
	    	$("#receiptModify"+id).show();
	    	$("#receiptDeleteOne"+id).show();
	    	$("#shopping_result_table").attr("style","width:140%;");
	    	
	    }
	     
	    
	    
	    // 换页
	    function changePage(pageNumber,event){
		    event.preventDefault();
	    	if(pageNumber<1) return false;
	    	// console.log("changePage,pageNumber="+pageNumber);
	    	
	    	var tds = $("#transactionDateStart").val();
	    	var tde = "" + $("#transactionDateEnd").val();
	    	var tzoffset = (new Date()).getTimezoneOffset() * 60000;
	    	
	    	if(tds!=null && tds!=""){
		       const transactionDateStart = new Date(new Date(tds)-tzoffset).toISOString().substring(0, 19);
	           $("#transactionDateStart").val(transactionDateStart);
	        }else{$("#transactionDateStart").val("");}
	        
	    	if(tde!=null && tde!=""){
		       const transactionDateEnd = new Date(new Date(tde)-tzoffset).toISOString().substring(0, 19);
		       $("#transactionDateEnd").val(transactionDateEnd);
	        }else{$("#transactionDateEnd").val("");}
	    	
	    	$("#page").val(pageNumber);
	    	
	    	$("#receiptQueryForm").submit();
	
	    	
	    }
	    
	    
	    function showTotal(){
		$("#showMain").val("false");
		
		var page = $("#page_ul").find(".active").children().text();
		$("#page").val(page);
		
		$("#receiptQueryForm").submit();
		
		return true;
		
	   }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    