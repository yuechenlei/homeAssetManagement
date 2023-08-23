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
	    	$("#shopping_result_table").attr("style","width:210%;");
	    	
	    	// 取旧值
	    	var realNameOld = $("#realName"+id).text();
	    	var packNameOld = $("#packName"+id).text();
	    	var productNameOld = $("#productName"+id).text();
	    	var quantityOld = $("#quantity"+id).text();
	    	var weightOld = $("#weight"+id).text();
	    	var unitPriceOld = $("#unitPrice"+id).text();
	    	var totalPriceOld = $("#totalPrice"+id).text();
	    	var unitOfPriceOld = $("#unitOfPrice"+id).text();
	    	var taxTypeOld = $("#taxType"+id).text();
	    	var vatOld = $("#vat"+id).text();
	    	var taxNumberOld = $("#taxNumber"+id).text();
	    	var couponOld = $("#coupon"+id).text();
	    	var discountOld = $("#discount"+id).text();
	    	var payBackOld = $("#payBack"+id).text();
	    	var subCategoryOld = $("#subCategory"+id).text();
	    	var categoryOld = $("#category"+id).text();
	    	var marketNameOld = $("#marketName"+id).text();
	    	var customerReceiptIdOld = $("#customerReceiptId"+id).attr("data-id");
	    	    customerReceiptIdOld = (customerReceiptIdOld == '0')?'':customerReceiptIdOld;
	    	var mailingAddressIdOld = $("#mailingAddressId"+id).attr("data-id");
	    	    mailingAddressIdOld = (mailingAddressIdOld == '0')?'':mailingAddressIdOld;
	    	var companyInformationIdOld = $("#companyInformationId"+id).attr("data-id");
	    	    companyInformationIdOld = (companyInformationIdOld == '0')?'':companyInformationIdOld;
	    	var transactionDateOld = $("#transactionDate"+id).text();
	    	var creatDateOld = $("#creatDate"+id).text();
	    	var lastModifyDateOld = $("#lastModifyDate"+id).text();
	    	
	    	// 时区问题处理
	    	var tzoffset = (new Date()).getTimezoneOffset() * 60000
	    	const transactionDateOldFormat = new Date(new Date(transactionDateOld)-tzoffset).toISOString().substring(0, 19);
	    	const creatDateOldFormat = new Date(new Date(creatDateOld)-tzoffset).toISOString().substring(0, 19);
	    	
	    	// 变为输入框
	    	$("#realName"+id).html('<input type="text" id="realNameInput'+id+'" value="'+realNameOld+'" style="width:100%" />');
	    	$("#packName"+id).html('<input type="text" id="packNameInput'+id+'" value="'+packNameOld+'" style="width:100%" />');
	    	$("#productName"+id).html('<input type="text" id="productNameInput'+id+'" value="'+productNameOld+'" style="width:100%" />');
	    	$("#quantity"+id).html('<input type="number" id="quantityInput'+id+'" value="'+quantityOld+'" step="1"  min="1" max="999" style="width:100%"/>');
	    	$("#weight"+id).html('<input type="number" id="weightInput'+id+'" value="'+weightOld+'" step="0.001"  min="0.001" max="999" style="width:100%"/>');
	    	$("#unitPrice"+id).html('<input type="number" id="unitPriceInput'+id+'" value="'+unitPriceOld+'" step="0.01"  min="0.00" max="999999" style="width:100%"/>');
	    	$("#totalPrice"+id).html('<input type="number" id="totalPriceInput'+id+'" value="'+totalPriceOld+'" step="0.01"  min="0.00" max="999999" style="width:100%"/>');
	    	$("#unitOfPrice"+id).html('<input type="text" id="unitOfPriceInput'+id+'" value="'+unitOfPriceOld+'" style="width:100%" />');
	    	$("#taxType"+id).html('<select id="taxTypeInput'+id+'" value="'+taxTypeOld+'" style="width:100%">'
	    			              +'<option value="A">A=7%</option>'
	    			              +'<option value="B">B=19%</option>'
	    			              +'<option value="C">C=19%</option>'+'</select>');
	    	$("#vat"+id).html('<input type="number" id="vatInput'+id+'" value="'+vatOld+'" step="0.01"  min="0.00" max="999" style="width:100%"/>');
	    	$("#taxNumber"+id).html('<input type="text" id="taxNumberInput'+id+'" value="'+taxNumberOld+'" style="width:100%" />');
	    	$("#coupon"+id).html('<input type="number" id="couponInput'+id+'" value="'+couponOld+'" step="0.01"  min="0.00" max="1" style="width:100%"/>');
	    	$("#discount"+id).html('<input type="number" id="discountInput'+id+'" value="'+discountOld+'" step="0.01"  min="0.00" max="1" style="width:100%"/>');
	    	$("#payBack"+id).html('<input type="number" id="payBackInput'+id+'" value="'+payBackOld+'" step="0.01"  min="0.00" max="1" style="width:100%"/>');
	    	$("#customerReceiptId"+id).html('<input type="text" id="customerReceiptIdInput'+id+'" value="'+customerReceiptIdOld+'" style="width:100%" />');
	    	$("#mailingAddressId"+id).html('<input type="text" id="mailingAddressIdInput'+id+'" value="'+mailingAddressIdOld+'" style="width:100%" />');
	    	$("#companyInformationId"+id).html('<input type="text" id="companyInformationIdInput'+id+'" value="'+companyInformationIdOld+'" style="width:100%" />');
	    	$("#transactionDate"+id).html('<input type="datetime-local" id="transactionDateInput'+id+'" value="'+transactionDateOldFormat+'" step="1" />');
	    	$("#creatDate"+id).html('<input type="datetime-local" id="creatDateInput'+id+'" value="'+creatDateOldFormat+'" step="1" />');
	    	$("#lastModifyDate"+id).text('');
	    	$("#marketName"+id).html('<input type="text" id="marketNameInput'+id+'" value="'+marketNameOld+'" style="width:100%" />');
	    	// $("#category"+id).html('<input type="text" id="categoryInput'+id+'" value="'+categoryOld+'" size="5" />');
	    	// $("#subCategory"+id).html('<input type="text" id="subCategoryInput'+id+'" value="'+subCategoryOld+'" size="5" />');
	    	$("#category"+id).html($("#categoryModel").clone());
	    	$("#category"+id).children("select").attr("id","categoryInput"+id);
	    	$("#categoryInput"+id).val(""+categoryOld);
	    	subCategoryInput(""+id,categoryOld,subCategoryOld);
	    	
	    	// 为category添加change事件
	    	$("#category"+id).change(function(){
	    		var selectedVal = $("#category"+id+" :selected").val();
	    		categoryChange(id,selectedVal);      
	        });
	    	
	    	// 为 取消修改 做准备
	    	$("#receiptModifyCancel"+id).attr("onclick","receiptModifyCancel('"+id+"',event,'"+realNameOld+"','"+packNameOld+"','"
	    	        +productNameOld+"','"+quantityOld+"','"+weightOld+"','"+unitPriceOld+"','"+totalPriceOld+"','"+unitOfPriceOld
	    	        +"','"+taxTypeOld+"','"+vatOld+"','"+taxNumberOld+"','"+couponOld+"','"+discountOld+"','"+payBackOld+"','"
	    	        +subCategoryOld+"','"+categoryOld+"','"+marketNameOld+"','"+customerReceiptIdOld+"','"+mailingAddressIdOld+"','"
	    	        +companyInformationIdOld+"','"+transactionDateOld+"','"+creatDateOld+"','"+lastModifyDateOld+"')");
	    	
	    }
	    
	    // 取消修改
	    function receiptModifyCancel(id,event,realNameOld,packNameOld,productNameOld,quantityOld,weightOld,unitPriceOld,totalPriceOld,
	    		                     unitOfPriceOld,taxTypeOld,vatOld,taxNumberOld,couponOld,discountOld,payBackOld,subCategoryOld,
	    		                     categoryOld,marketNameOld,customerReceiptIdOld,mailingAddressIdOld,companyInformationIdOld,transactionDateOld,
	    		                     creatDateOld,lastModifyDateOld){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	$("#receiptModifyCancel"+id).hide();
	    	$("#receiptModifyConfirm"+id).hide();
	    	$("#receiptModify"+id).show();
	    	$("#receiptDeleteOne"+id).show();
	    	$("#shopping_result_table").attr("style","width:210%;");
	    	
	    	$("#realName"+id).text(realNameOld);
	    	$("#packName"+id).text(packNameOld);
	    	$("#productName"+id).text(productNameOld);
	    	$("#quantity"+id).text(quantityOld);
	    	$("#weight"+id).text(weightOld);
	    	$("#unitPrice"+id).text(unitPriceOld);
	    	$("#totalPrice"+id).text(totalPriceOld);
	    	$("#unitOfPrice"+id).text(unitOfPriceOld);
	    	$("#taxType"+id).text(taxTypeOld);
	    	$("#vat"+id).text(vatOld);
	    	$("#taxNumber"+id).text(taxNumberOld);
	    	$("#coupon"+id).text(couponOld);
	    	$("#discount"+id).text(discountOld);
	    	$("#payBack"+id).text(payBackOld);
	    	$("#subCategory"+id).text(subCategoryOld);
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
	    	$("#creatDate"+id).text(creatDateOld);
	    	$("#lastModifyDate"+id).text(lastModifyDateOld);
	    	
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
	    	var taxType = $("#taxTypeInput"+id).val();
	    	var vat = $("#vatInput"+id).val();
	    	var taxNumber = $("#taxNumberInput"+id).val();
	    	var coupon = $("#couponInput"+id).val();
	    	var discount = $("#discountInput"+id).val();
	    	var payBack = $("#payBackInput"+id).val();
	    	var subCategory = $("#subCategoryInput"+id).val();
	    	var category = $("#categoryInput"+id).val();
	    	var marketName = $("#marketNameInput"+id).val();
	    	var customerReceiptId = $("#customerReceiptIdInput"+id).val();
	    	var mailingAddressId = $("#mailingAddressIdInput"+id).val();
	    	var companyInformationId = $("#companyInformationIdInput"+id).val();
	    	var transactionDate = $("#transactionDateInput"+id).val();
	    	var creatDate = $("#creatDateInput"+id).val();
	    	
	    	// 生成FormData数据，像表单一样传输和解析
	    	var receiptJson = {"id":id,"realName":realName,"packName":packName,"productName":productName,"quantity":quantity,"weight":weight,"unitPrice":unitPrice,
   			                   "totalPrice":totalPrice,"unitOfPrice":unitOfPrice,"taxType":taxType,"vat":vat,"taxNumber":taxNumber,"coupon":coupon,
			                   "discount":discount,"payBack":payBack,"subCategory":subCategory,"category":category,"marketName":marketName,"customerReceiptId":customerReceiptId,
			                   "mailingAddressId":mailingAddressId,"companyInformationId":companyInformationId,"transactionDate":transactionDate,"creatDate":creatDate};
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
	    	$("#taxType"+id).text(result.taxType);
	    	$("#vat"+id).text(result.vat);
	    	$("#taxNumber"+id).text(result.taxNumber);
	    	$("#coupon"+id).text(result.coupon);
	    	$("#discount"+id).text(result.discount);
	    	$("#payBack"+id).text(result.payBack);
	    	$("#subCategory"+id).text(result.subCategory);
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
	    	$("#creatDate"+id).text(result.creatDate);
	    	$("#lastModifyDate"+id).text(result.lastModifyDate);
	    	
	    	$("#tr"+id).addClass("text-success");
	    	
	    	$("#receiptModifyCancel"+id).hide();
	    	$("#receiptModifyConfirm"+id).hide();
	    	$("#receiptModify"+id).show();
	    	$("#receiptDeleteOne"+id).show();
	    	$("#shopping_result_table").attr("style","width:210%;");
	    	
	    }
	     
	     // 修改时，子类别显示
	     function subCategoryInput(id,categoryOld,subCategoryOld){
	    	if(id==null||id==""||id==undefined) return;
	  		switch(categoryOld){
	  		    case "Food": $("#subCategory"+id).html($("#FoodSubCategory").clone());
	  		                 $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
	  		                 $("#subCategoryInput"+id).val(""+subCategoryOld);
	  		                 $("#subCategoryInput"+id).removeClass();
	  		                 break;
	  		    case "Clothing": $("#subCategory"+id).html($("#ClothingSubCategory").clone());
	                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
		                         $("#subCategoryInput"+id).val(""+subCategoryOld);
		                         $("#subCategoryInput"+id).removeClass();
	                             break;
	  		    case "Cooking": $("#subCategory"+id).html($("#CookingSubCategory").clone());
	                            $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
		                        $("#subCategoryInput"+id).val(""+subCategoryOld);
		                        $("#subCategoryInput"+id).removeClass();
	                            break;
	  		    case "Household": $("#subCategory"+id).html($("#HouseholdSubCategory").clone());
	                              $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
		                          $("#subCategoryInput"+id).val(""+subCategoryOld);
		                          $("#subCategoryInput"+id).removeClass();
	                              break;
	  		    case "Transportation": $("#subCategory"+id).html($("#TransportationSubCategory").clone());
                                       $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                       $("#subCategoryInput"+id).val(""+subCategoryOld);
                                       $("#subCategoryInput"+id).removeClass();
                                       break;
	  		    case "Electronics": $("#subCategory"+id).html($("#ElectronicsSubCategory").clone());
                                    $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                    $("#subCategoryInput"+id).val(""+subCategoryOld);
                                    $("#subCategoryInput"+id).removeClass();
                                    break;
	  		    case "Pack": $("#subCategory"+id).html($("#PackSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                             $("#subCategoryInput"+id).val(""+subCategoryOld);
                             $("#subCategoryInput"+id).removeClass();
                             break;
	  		    case "Tool": $("#subCategory"+id).html($("#ToolSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                             $("#subCategoryInput"+id).val(""+subCategoryOld);
                             $("#subCategoryInput"+id).removeClass();
                             break;
	  		    case "Book": $("#subCategory"+id).html($("#BookSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                             $("#subCategoryInput"+id).val(""+subCategoryOld);
                             $("#subCategoryInput"+id).removeClass();
                             break;
	  		    case "Garden": $("#subCategory"+id).html($("#GardenSubCategory").clone());
                               $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                               $("#subCategoryInput"+id).val(""+subCategoryOld);
                               $("#subCategoryInput"+id).removeClass();
                               break;
	  		    case "BabyAndChild": $("#subCategory"+id).html($("#BabyAndChildSubCategory").clone());
                                     $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                     $("#subCategoryInput"+id).val(""+subCategoryOld);
                                     $("#subCategoryInput"+id).removeClass();
                                     break;
	  		    case "Care": $("#subCategory"+id).html($("#CareSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                             $("#subCategoryInput"+id).val(""+subCategoryOld);
                             $("#subCategoryInput"+id).removeClass();
                             break;
	  		  
	  		  }
	    }
	    
	    // 当类别改变时，子类别随之改变
	    function categoryChange(id,selectedVal){
	    	switch(selectedVal){
  		    case "Food": $("#subCategory"+id).html($("#FoodSubCategory").clone());
  		                 $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
  		                 $("#subCategoryInput"+id).removeClass();
  		                 break;
  		    case "Clothing": $("#subCategory"+id).html($("#ClothingSubCategory").clone());
                             $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
	                         $("#subCategoryInput"+id).removeClass();
                             break;
  		    case "Cooking": $("#subCategory"+id).html($("#CookingSubCategory").clone());
                            $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
	                        $("#subCategoryInput"+id).removeClass();
                            break;
  		    case "Household": $("#subCategory"+id).html($("#HouseholdSubCategory").clone());
                              $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
	                          $("#subCategoryInput"+id).removeClass();
                              break;
  		    case "Transportation": $("#subCategory"+id).html($("#TransportationSubCategory").clone());
                                   $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                   $("#subCategoryInput"+id).removeClass();
                                   break;
  		    case "Electronics": $("#subCategory"+id).html($("#ElectronicsSubCategory").clone());
                                $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                $("#subCategoryInput"+id).removeClass();
                                break;
  		    case "Pack": $("#subCategory"+id).html($("#PackSubCategory").clone());
                         $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                         $("#subCategoryInput"+id).removeClass();
                         break;
  		    case "Tool": $("#subCategory"+id).html($("#ToolSubCategory").clone());
                         $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                         $("#subCategoryInput"+id).removeClass();
                         break;
  		    case "Book": $("#subCategory"+id).html($("#BookSubCategory").clone());
                         $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                         $("#subCategoryInput"+id).removeClass();
                         break;
  		    case "Garden": $("#subCategory"+id).html($("#GardenSubCategory").clone());
                           $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                           $("#subCategoryInput"+id).removeClass();
                           break;
  		    case "BabyAndChild": $("#subCategory"+id).html($("#BabyAndChildSubCategory").clone());
                                 $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                                 $("#subCategoryInput"+id).removeClass();
                                 break;
  		    case "Care": $("#subCategory"+id).html($("#CareSubCategory").clone());
                         $("#subCategory"+id).children("select").attr("id","subCategoryInput"+id);
                         $("#subCategoryInput"+id).removeClass();
                         break;
  		  
  		  }
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
	    
	    
	    function showMain(){
		$("#showMain").val("true");
		
		var page = $("#page_ul").find(".active").children().text();
		$("#page").val(page);
		
		$("#receiptQueryForm").submit();
		
		return true;
		
	   }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    