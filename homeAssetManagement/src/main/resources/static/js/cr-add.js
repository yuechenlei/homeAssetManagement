/**
 * 客户小票条目添加js
 */
 
       // 表单验证
	   $(function(){
		   $("#customerReceiptAddForm").submit(function( event ) {
			   var i = 0;
			   if($("#market_name").val().trim()==""){
				   $("#market_name").nextAll(".invalid-feedback").text("必须输入商店名称！");
				   i++;
			   }
			   if($("#terminalId").val().trim()==""){
				   $("#terminalId").nextAll(".invalid-feedback").text("请输入TerminalId！");
				   i++;
			   }
			   if($("#transactionNumber").val().trim()==""){
				   $("#transactionNumber").nextAll(".invalid-feedback").text("请输入TransactionNumber！");
				   i++;
			   }
			   if($("#paymentMethodE").val().trim()==""){
				   $("#paymentMethodE").nextAll(".invalid-feedback").text("请选择付款方式！");
				   i++;
			   }
			   
			   if($("#amount").val().trim()==""){
				   $("#amount").nextAll(".invalid-feedback").text("交易金额是必须的！");
				   i++;
			   }
			   if($("#unitOfPrice").val().trim()==""){
				   $("#unitOfPrice").nextAll(".invalid-feedback").text("请输入单位，例如：Euro");
				   i++;
			   }
			   
			   if($("#transactionDate").val()==""){
				   $("#transactionDate").nextAll(".invalid-feedback").text("交易日期是必须的！");
				   i++;
			   }
			   
			   if(i>0){
				   event.preventDefault();
				   $("#customerReceiptAddForm").addClass("was-validated");
			   }else{
				   return ture;  // 执行提交
			   }
		   });
		   
	   });
	   
	   
	   function customerReceiptReset(){
		$("#customerReceiptAddForm").removeClass("was-validated");
		return true;
	}
	
	$(function(){
		$("#home_a_text").removeClass("active");
		$("#navbarDropdown").addClass("active");
	});