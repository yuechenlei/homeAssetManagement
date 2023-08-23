/**
 * 
 */
 
        // 删除预处理
	    function crDeleteOne(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return false;
	    	
	    	$("#crModalBody").text("确定删除吗？id="+id);
	    	$("#crModelConfirm").attr("onclick","doCrDeleteOne("+id+")");
	    	$("#showModelButton").click();
	    }
	    
	    // 执行删除
	    function doCrDeleteOne(id){
	    	$("#crModelConfirm").attr("onclick","");
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/customerReceipt/deleteOne/"+id,
	    		  data: "",
	    		  dataType: "json",
	    		  success: function(result){
					   if(result.success){
						  afterDoCrDeleteOne(id);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("删除失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    	
	    }
	    
	    // 删除后处理
	    function afterDoCrDeleteOne(id){
	    	$("#tr"+id).addClass("text-danger");
	    	$("#tr"+id).hide(1200);
	    }
	    
	     // 修改预处理
	    function crModify(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	$("#crModifyCancel"+id).show();
	    	$("#crModifyConfirm"+id).show();
	    	$("#crModify"+id).hide();
	    	$("#crDeleteOne"+id).hide();
	    	// $("#cr_result_table").attr("style","width:210%;");
	    	
	    	// 取旧值
	    	var terminalIdOld = $("#terminalId"+id).text();
	    	var posInfoOld = $("#posInfo"+id).text();
	    	var transactionNumberOld = $("#transactionNumber"+id).text();
	    	var receiptNumberOld = $("#receiptNumber"+id).text();
	    	var checkoutCounterOld = $("#checkoutCounter"+id).text();
	    	var cashierOld = $("#cashier"+id).text();
	    	var cardNumberOld = $("#cardNumber"+id).text();
	    	var cardOld = $("#card"+id).text();
	    	var payByOld = $("#payBy"+id).text();
	    	var contactTypeOld = $("#contactType"+id).text();
	    	var paymentMethodEOld = $("#paymentMethodE"+id).text();
	    	var amountOld = $("#amount"+id).attr("data-text");
	    	var amountOldText = $("#amount"+id).text();
	    	var chipDataOld = $("#chipData"+id).text();
	    	var contractorOld = $("#contractor"+id).text();
	    	var authorizationNumberOld = $("#authorizationNumber"+id).text();
	    	var marketNameOld = $("#marketName"+id).text();
	    	var transactionDateOld = $("#transactionDate"+id).text();
	    	var creatDateOld = $("#creatDate"+id).text();
	    	var lastModifyDateOld = $("#lastModifyDate"+id).text();
	    	
	    	// 时区问题处理
	    	var tzoffset = (new Date()).getTimezoneOffset() * 60000
	    	const transactionDateOldFormat = new Date(new Date(transactionDateOld)-tzoffset).toISOString().substring(0, 19);
	    	const creatDateOldFormat = new Date(new Date(creatDateOld)-tzoffset).toISOString().substring(0, 19);
	    	
	    	// 变为输入框
	    	$("#terminalId"+id).html('<input type="text" id="terminalIdInput'+id+'" value="'+terminalIdOld+'" style="width:100%" />');
	    	$("#posInfo"+id).html('<input type="text" id="posInfoInput'+id+'" value="'+posInfoOld+'" style="width:100%" />');
	    	$("#transactionNumber"+id).html('<input type="text" id="transactionNumberInput'+id+'" value="'+transactionNumberOld+'" style="width:100%" />');
	    	$("#receiptNumber"+id).html('<input type="text" id="receiptNumberInput'+id+'" value="'+receiptNumberOld+'" style="width:100%"/>');
	    	$("#checkoutCounter"+id).html('<input type="text" id="checkoutCounterInput'+id+'" value="'+checkoutCounterOld+'" style="width:100%"/>');
	    	$("#cashier"+id).html('<input type="text" id="cashierInput'+id+'" value="'+cashierOld+'" style="width:100%"/>');
	    	$("#cardNumber"+id).html('<input type="text" id="cardNumberInput'+id+'" value="'+cardNumberOld+'" style="width:100%"/>');
	    	$("#card"+id).html('<input type="text" id="cardInput'+id+'" value="'+cardOld+'" style="width:100%" />');
	    	$("#payBy"+id).html('<input type="text" id="payByInput'+id+'" value="'+payByOld+'" list="payByList" style="width:100%"/>'
	    	                    +'<datalist id="payByList"><option value="Card">Kartenzahlung</option><option value="Cash">Bargeld</option></datalist>');
	    	$("#contactType"+id).html('<input type="text" id="contactTypeInput'+id+'" value="'+contactTypeOld+'" list="contactTypeList" style="width:100%" />'
	    	                         +'<datalist id="contactTypeList"><option value="contactless">Kontaktlos</option></datalist>');
	    	$("#paymentMethodE"+id).html('<input type="text" id="paymentMethodEInput'+id+'" value="'+paymentMethodEOld+'" list="paymentMethodEList" style="width:100%"/>'
	    	                        +'<datalist id="paymentMethodEList"><option value="Cash">Bargeld</option><option value="GiroCard">Girocard</option>'
	    	                        +'<option value="CreditCard">Kreditkarte</option><option value="NFC">Kontaktlos</option><option value="Advance">Vorkasse</option>'
	    	                        +'<option value="Financing">Finanzierung</option><option value="PayPal">PayPal</option><option value="Giropay">Giropay</option>'
	    	                        +'<option value="Online">Online</option></datalist>');
	    	$("#amount"+id).html('<input type="number" id="amountInput'+id+'" value="'+amountOld+'" step="0.01"  min="0.00" style="width:100%"/>');
	    	$("#chipData"+id).html('<input type="text" id="chipDataInput'+id+'" value="'+chipDataOld+'" style="width:100%"/>');
	    	$("#contractor"+id).html('<input type="text" id="contractorInput'+id+'" value="'+contractorOld+'" style="width:100%" />');
	    	$("#authorizationNumber"+id).html('<input type="text" id="authorizationNumberInput'+id+'" value="'+authorizationNumberOld+'" style="width:100%" />');
	    	$("#marketName"+id).html('<input type="text" id="marketNameInput'+id+'" value="'+marketNameOld+'" list="marketNameList" style="width:100%" />'
	    	                         +'<datalist id="marketNameList"><option value="Aldi"><option value="Edeka"><option value="Lidl">'
	    	                         +'<option value="Rewe"><option value="Rossman"><option value="DM"><option value="Anh Linh Asiamarkt">'
	    	                         +'<option value="NP"></datalist>');
	    	$("#transactionDate"+id).html('<input type="datetime-local" id="transactionDateInput'+id+'" value="'+transactionDateOldFormat+'" step="1" />');
	    	$("#creatDate"+id).html('<input type="datetime-local" id="creatDateInput'+id+'" value="'+creatDateOldFormat+'" step="1" />');
	    	$("#lastModifyDate"+id).text('');
	    	
	    	// 为 取消修改 做准备
	    	$("#crModifyCancel"+id).attr("onclick","crModifyCancel('"+id+"',event,'"+terminalIdOld+"','"+posInfoOld+"','"
	    	        +transactionNumberOld+"','"+receiptNumberOld+"','"+checkoutCounterOld+"','"+cashierOld+"','"+cardNumberOld+"','"+cardOld
	    	        +"','"+payByOld+"','"+contactTypeOld+"','"+paymentMethodEOld+"','"+amountOldText+"','"+chipDataOld+"','"+contractorOld+"','"
	    	        +authorizationNumberOld+"','"+marketNameOld+"','"+transactionDateOld+"','"+creatDateOld+"','"+lastModifyDateOld+"')");
	    	
	    }
	    
	    // 取消修改
	    function crModifyCancel(id,event,terminalIdOld,posInfoOld,transactionNumberOld,receiptNumberOld,checkoutCounterOld,cashierOld,cardNumberOld,
	    		                     cardOld,payByOld,contactTypeOld,paymentMethodEOld,amountOldText,chipDataOld,contractorOld,authorizationNumberOld,
	    		                     marketNameOld,transactionDateOld,creatDateOld,lastModifyDateOld){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	$("#crModifyCancel"+id).hide();
	    	$("#crModifyConfirm"+id).hide();
	    	$("#crModify"+id).show();
	    	$("#crDeleteOne"+id).show();
	    	// $("#cr_result_table").attr("style","width:210%;");
	    	
	    	$("#terminalId"+id).text(terminalIdOld);
	    	$("#posInfo"+id).text(posInfoOld);
	    	$("#transactionNumber"+id).text(transactionNumberOld);
	    	$("#receiptNumber"+id).text(receiptNumberOld);
	    	$("#checkoutCounter"+id).text(checkoutCounterOld);
	    	$("#cashier"+id).text(cashierOld);
	    	$("#cardNumber"+id).text(cardNumberOld);
	    	$("#card"+id).text(cardOld);
	    	$("#payBy"+id).text(payByOld);
	    	$("#contactType"+id).text(contactTypeOld);
	    	$("#paymentMethodE"+id).text(paymentMethodEOld);
	    	$("#amount"+id).text(amountOldText);
	    	$("#chipData"+id).text(chipDataOld);
	    	$("#contractor"+id).text(contractorOld);
	    	$("#authorizationNumber"+id).text(authorizationNumberOld);
	    	$("#marketName"+id).text(marketNameOld);
	    	$("#transactionDate"+id).text(transactionDateOld);
	    	$("#creatDate"+id).text(creatDateOld);
	    	$("#lastModifyDate"+id).text(lastModifyDateOld);
	    	
	    }
	    
	    // 确定修改
	    function crModifyConfirm(id,event){
	    	event.preventDefault();
	    	if(id==null||id==""||id==undefined) return false;
	    	
	    	// 取值
	    	var terminalId = $("#terminalIdInput"+id).val();
	    	var posInfo = $("#posInfoInput"+id).val();
	    	var transactionNumber = $("#transactionNumberInput"+id).val();
	    	var receiptNumber = $("#receiptNumberInput"+id).val();
	    	var checkoutCounter = $("#checkoutCounterInput"+id).val();
	    	var cashier = $("#cashierInput"+id).val();
	    	var cardNumber = $("#cardNumberInput"+id).val();
	    	var card = $("#cardInput"+id).val();
	    	var payBy = $("#payByInput"+id).val();
	    	var contactType = $("#contactTypeInput"+id).val();
	    	var paymentMethodE = $("#paymentMethodEInput"+id).val();
	    	var amount = $("#amountInput"+id).val();
	    	var chipData = $("#chipDataInput"+id).val();
	    	var contractor = $("#contractorInput"+id).val();
	    	var authorizationNumber = $("#authorizationNumberInput"+id).val();
	    	var marketName = $("#marketNameInput"+id).val();
	    	var transactionDate = $("#transactionDateInput"+id).val();
	    	var creatDate = $("#creatDateInput"+id).val();
	    	
	    	// 生成FormData数据，像表单一样传输和解析
	    	var cReceiptJson = {"id":id,"terminalId":terminalId,"posInfo":posInfo,"transactionNumber":transactionNumber,"receiptNumber":receiptNumber,"checkoutCounter":checkoutCounter,
	    	                   "cashier":cashier,"cardNumber":cardNumber,"card":card,"paymentMethod.payBy":payBy,"paymentMethod.contactType":contactType,"paymentMethod.paymentMethodE":paymentMethodE,
	    	                   "amount":amount,"chipData":chipData,"contractor":contractor,"authorizationNumber":authorizationNumber,"marketName":marketName,"transactionDate":transactionDate,
			                   "creatDate":creatDate};
	    	var formData = new FormData();
	    	for ( var key in cReceiptJson ) {
	    		formData.append(key, cReceiptJson[key]);
	    	}
	    	
	    	$.ajax({
	    		  type: "POST",
	    		  url: "/customerReceipt/modify",
	    		  data: formData,      // 要发送的数据
	    		  contentType:false,   // 默认为 application/x-www-form-urlencoded; charset=UTF-8
	    		  processData:false,   // 默认为true，会把数据解析为query字符串，对应于contentType的默认值
	    		  dataType: "json",    // 要接收的数据类型
	    		  success: function(result){
					   if(result.success){
						  afterCrModifyConfirm(result);
					   }else if(result.error){
						   
					   }
				   },
				  error:function(jqXHR,textStatus,errorThrown){
					   alert("修改失败，系统错误"+textStatus);
				   }
	    		  
	    		});
	    }
	    
	    // 修改后处理
	    function afterCrModifyConfirm(result){
	    	var id = result.id;
	    	if(id==null||id==""||id==undefined) return;
	    	
	    	// 修改页面显示
	    	$("#terminalId"+id).text(result.terminalId);
	    	$("#posInfo"+id).text(result.posInfo);
	    	$("#transactionNumber"+id).text(result.transactionNumber);
	    	$("#receiptNumber"+id).text(result.receiptNumber);
	    	$("#checkoutCounter"+id).text(result.checkoutCounter);
	    	$("#cashier"+id).text(result.cashier);
	    	$("#cardNumber"+id).text(result.cardNumber);
	    	$("#card"+id).text(result.card);
	    	$("#payBy"+id).text(result.paymentMethod.payBy);
	    	$("#contactType"+id).text(result.paymentMethod.contactType);
	    	$("#paymentMethodE"+id).text(result.paymentMethod.paymentMethodE);
	    	$("#amount"+id).text(result.amount+result.unitOfPrice);
	    	$("#amount"+id).attr("data-text",result.amount);
	    	$("#chipData"+id).text(result.chipData);
	    	$("#contractor"+id).text(result.contractor);
	    	$("#authorizationNumber"+id).text(result.authorizationNumber);
	    	$("#marketName"+id).text(result.marketName);
	    	$("#transactionDate"+id).text(result.transactionDate);
	    	$("#creatDate"+id).text(result.creatDate);
	    	$("#lastModifyDate"+id).text(result.lastModifyDate);
	    	
	    	$("#tr"+id).addClass("text-success");
	    	
	    	$("#crModifyCancel"+id).hide();
	    	$("#crModifyConfirm"+id).hide();
	    	$("#crModify"+id).show();
	    	$("#crDeleteOne"+id).show();
	    	// $("#cr_result_table").attr("style","width:210%;");
	    	
	    }
	    
	    // 换页
	    function changePage(pageNumber,event){
		    event.preventDefault();
	    	if(pageNumber<1) return false;
	    	
	    	// 处理时区问题
	    	var tds = $("#transactionDateStart").val();
	    	var tde = $("#transactionDateEnd").val();
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
	    	
	    	$("#crQueryForm").submit();
	
	    	
	    }
 
 