package net.xiaoqingxin.homeAssetManagement.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.xiaoqingxin.homeAssetManagement.beans.CustomerReceiptQueryBean;
import net.xiaoqingxin.homeAssetManagement.beans.Paged;
import net.xiaoqingxin.homeAssetManagement.model.CustomerReceipt;
import net.xiaoqingxin.homeAssetManagement.repository.CustomerReceiptRepository;
import net.xiaoqingxin.homeAssetManagement.service.CustomerReceiptQueryService;

@Controller
@RequestMapping("/customerReceipt")
public class CustomerReceiptController {
	private static final Logger logger = LoggerFactory.getLogger(CustomerReceiptController.class);
	
	@Autowired
	private CustomerReceiptRepository crRepository;
	
	@Autowired
	private CustomerReceiptQueryService crQueryService;
	
	@RequestMapping("/toCustomerReceipt")
	public String toCustomerReceipt() {
		return "/customerReceipt/customerReceipt-index.html";
	}
	
	@RequestMapping("/toAdd")
	public String toAdd() {
		return "/customerReceipt/customerReceipt-add.html";
	}
	
	@RequestMapping("/toQuery")
	public String toQuery() {
		return "/customerReceipt/customerReceipt-query.html";
	}
	
	/** Kundenbeleg 条目添加  */
	@RequestMapping("/add")
	public String add(@ModelAttribute CustomerReceipt customerReceipt) {
		if(null==customerReceipt) {
			throw new RuntimeException("CustomerReceipt is null");
		}
		
        Date date = new Date();
        customerReceipt.setCreatDate(date);
        customerReceipt.setLastModifyDate(date);
        
        crRepository.save(customerReceipt);
        
		return "/customerReceipt/customerReceipt-addResult.html";
	}
	
	/** 查询  */
	@RequestMapping("/query")
	public String query(@ModelAttribute CustomerReceiptQueryBean customerReceiptQueryBean,Model model) {
		int page = customerReceiptQueryBean.getPage();
		int size = customerReceiptQueryBean.getSize();
		
		Paged<CustomerReceipt> paged = crQueryService.getPage(page, size, customerReceiptQueryBean);
		
		Page<CustomerReceipt> crPage = paged.getPage();
		if (!crPage.isEmpty()) {
			for (Iterator<CustomerReceipt> iterator = crPage.iterator(); iterator.hasNext();) {
				CustomerReceipt cr = (CustomerReceipt) iterator.next();
				logger.info("Method=query{},customerReceipt=",cr);
				
			}
		}
		
        model.addAttribute("paged", paged);
		
		return "/customerReceipt/customerReceipt-queryResult.html";
	}
	
	/** 删除一条数据 */
	@RequestMapping("/deleteOne/{id}")
	@ResponseBody
	public Map<String,Boolean> crDeleteOne(@PathVariable Long id) {
		
		crRepository.deleteById(id);
		
		Map<String, Boolean> result = new HashMap<>();
		result.put("success",true);
		
		return result;
	}
	
	/** 修改  */
	@RequestMapping("/modify")
	@ResponseBody
	public Map<String,Object> modify(@ModelAttribute CustomerReceipt cReceipt){
		
		cReceipt.setLastModifyDate(new Date());
		cReceipt = crRepository.save(cReceipt);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatDate = sdf.format(cReceipt.getCreatDate());
		String lastModifyDate = sdf.format(cReceipt.getLastModifyDate());
		
		// 把bean转为Map
		Map<String,Object> resultMap = new ObjectMapper().convertValue(cReceipt, new TypeReference<Map<String, Object>>() {});
		resultMap.put("creatDate", creatDate);
		resultMap.put("lastModifyDate", lastModifyDate);
		resultMap.put("success", true);
		
		return resultMap;
	}
	
	/** 查询 by id  */
	@RequestMapping("/query/{id}")
	public String queryById(@PathVariable Long id,Model model) {
		CustomerReceipt cr = null;
		
		Optional<CustomerReceipt> op = crRepository.findById(id);
		if(op.isPresent()) {
			cr = op.get();
		}
		
        model.addAttribute("cr", cr);
		
		return "/customerReceipt/customerReceipt-queryResult-one.html";
	}
	

}
