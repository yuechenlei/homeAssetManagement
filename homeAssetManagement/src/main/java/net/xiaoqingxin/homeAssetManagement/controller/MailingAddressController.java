package net.xiaoqingxin.homeAssetManagement.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.xiaoqingxin.homeAssetManagement.beans.MailingAddressQueryBean;
import net.xiaoqingxin.homeAssetManagement.beans.Paged;
import net.xiaoqingxin.homeAssetManagement.model.MailingAddress;
import net.xiaoqingxin.homeAssetManagement.repository.MailingAddressRepository;
import net.xiaoqingxin.homeAssetManagement.service.MailingAddressService;

@Controller
@RequestMapping("/mailingAddress")
public class MailingAddressController {
	
	@Autowired
	private MailingAddressRepository maRepo;
	
	@Autowired
	private MailingAddressService maService;
	
	@RequestMapping("/toMailingAddress")
	public String toMailingAddress() {
		return "/mailingAddress/mailingAddress-index.html";
	}
	
	@RequestMapping("/toAdd")
	public String toAdd() {
		return "/mailingAddress/mailingAddress-add.html";
	}
	
	@RequestMapping("/toQuery")
	public String toQuery() {
		return "/mailingAddress/mailingAddress-query.html";
	}
	
	
	/** 小票条目添加  */
	@RequestMapping("/add")
	public String add(@ModelAttribute MailingAddress mailingAddress) {
		if(null==mailingAddress) {
			throw new RuntimeException("mailingAddress is null");
		}
        
       
        Date date = new Date();
        mailingAddress.setCreatDate(date);
        mailingAddress.setLastModifyDate(date);
        
        maRepo.save(mailingAddress);
        
		return "/mailingAddress/mailingAddress-addResult.html";
	}
	
	
	/** 组合查询  */
	@RequestMapping("/query")
	public String query(@ModelAttribute("maQueryBean") MailingAddressQueryBean maQueryBean,Model model) {
		
		int page = maQueryBean.getPage();
		int size = maQueryBean.getSize();
		Paged<MailingAddress> paged = maService.getPage(page, size, maQueryBean);
		
		// Page<MailingAddress> receiptPage = paged.getPage();
		
		model.addAttribute("paged", paged);
		
		return "/mailingAddress/mailingAddress-queryResult.html";
	}
	
	
	/** 删除一条数据 */
	@RequestMapping("/deleteOne/{id}")
	@ResponseBody
	public Map<String,Boolean> deleteOne(@PathVariable Integer id) {
		
		maRepo.deleteById(id);
		
		Map<String, Boolean> result = new HashMap<>();
		result.put("success",true);
		
		return result;
	}
	
	
	/** 修改  */
	@RequestMapping("/modify")
	@ResponseBody
	public Map<String,Object> modify(@ModelAttribute MailingAddress mailingAddress) {
		
		mailingAddress.setLastModifyDate(new Date());
		maRepo.save(mailingAddress);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatDate = sdf.format(mailingAddress.getCreatDate());
		String lastModifyDate = sdf.format(mailingAddress.getLastModifyDate());
		
		// 把bean转为Map
		Map<String,Object> resultMap = new ObjectMapper().convertValue(mailingAddress, new TypeReference<Map<String, Object>>() {});
		resultMap.put("creatDate", creatDate);
		resultMap.put("lastModifyDate", lastModifyDate);
		resultMap.put("success", true);
		
		return resultMap;
	}
	
	/** 查询 by id  */
	@RequestMapping("/query/{id}")
	public String queryById(@PathVariable Integer id,Model model) {
		MailingAddress ma = null;
		
		Optional<MailingAddress> op = maRepo.findById(id);
		if(op.isPresent()) {
			ma = op.get();
		}
		
        model.addAttribute("ma", ma);
		
		return "/mailingAddress/mailingAddress-queryResult-one.html";
	}

}
