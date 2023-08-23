package net.xiaoqingxin.homeAssetManagement.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.xiaoqingxin.homeAssetManagement.beans.Paged;
import net.xiaoqingxin.homeAssetManagement.model.CompanyInformation;
import net.xiaoqingxin.homeAssetManagement.repository.CompanyInfoRepository;
import net.xiaoqingxin.homeAssetManagement.service.CompanyInfoService;

@Controller
@RequestMapping("/companyInfo")
public class CompanyInfoController {
	private static final Logger logger = LoggerFactory.getLogger(CompanyInfoController.class);
	
	@Autowired
	private CompanyInfoRepository companyInfoRepository;
	@Autowired
	private CompanyInfoService companyInfoService;
	
	@RequestMapping("/toCompanyInfo")
	public String toCompanyInformation() {
		return "/companyInfo/companyInfo-index.html";
	}
	
	@RequestMapping("/toAdd")
	public String toAdd() {
		return "/companyInfo/companyInfo-add.html";
	}
	
	@RequestMapping("/toQuery")
	public String toQuery() {
		return "/companyInfo/companyInfo-query.html";
	}
	
	/** 条目添加  */
	@RequestMapping("/add")
	public String add(@ModelAttribute CompanyInformation companyInformation) {
		if(null==companyInformation) {
			throw new RuntimeException("companyInformation is null");
		}
		logger.info("Method=add{},companyInformation=",companyInformation);
        
       
        Date date = new Date();
        companyInformation.setCreatDate(date);
        companyInformation.setLastModifyDate(date);
        
        companyInfoRepository.save(companyInformation);
        
        
		return "/companyInfo/companyInfo-addResult.html";
	}
	
	/** 信息查询  */
	@RequestMapping("/query")
	public String query(@RequestParam(required = false) String name,
			            @RequestParam(required = false,defaultValue = "1") Integer page,Model model) {
		
		int size = 10;
		
		Paged<CompanyInformation> paged = companyInfoService.getPage(page, size, name);
		
		model.addAttribute("paged", paged);
		
		return "/companyInfo/companyInfo-queryResult.html";
	}
	
	/** 删除一条数据 */
	@RequestMapping("/deleteOne/{id}")
	@ResponseBody
	public Map<String,Boolean> deleteOne(@PathVariable Integer id) {
		
		companyInfoRepository.deleteById(id);
		
		Map<String, Boolean> result = new HashMap<>();
		result.put("success",true);
		
		return result;
		
	}
	
	/** 修改  */
	@RequestMapping("/modify")
	@ResponseBody
	public Map<String,Object> modify(@ModelAttribute CompanyInformation companyInfo){
		
		companyInfo.setLastModifyDate(new Date());
		companyInfo = companyInfoRepository.save(companyInfo);
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String creatDate = sdf.format(companyInfo.getCreatDate());
		String lastModifyDate = sdf.format(companyInfo.getLastModifyDate());
		
		// 把bean转为Map
		Map<String,Object> resultMap = new ObjectMapper().convertValue(companyInfo, new TypeReference<Map<String, Object>>() {});
		resultMap.put("creatDate", creatDate);
		resultMap.put("lastModifyDate", lastModifyDate);
		resultMap.put("success", true);
		
		return resultMap;
	}
	
	/** 查询 by id  */
	@RequestMapping("/query/{id}")
	public String queryById(@PathVariable Integer id,Model model) {
		CompanyInformation companyInfo = null;
		
		Optional<CompanyInformation> op = companyInfoRepository.findById(id);
		if(op.isPresent()) {
			companyInfo = op.get();
		}
		
        model.addAttribute("companyInfo", companyInfo);
		
		return "/companyInfo/companyInfo-queryResult-one.html";
	}

}
