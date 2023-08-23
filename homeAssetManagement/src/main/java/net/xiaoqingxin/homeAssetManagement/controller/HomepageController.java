package net.xiaoqingxin.homeAssetManagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class HomepageController {
	
	@RequestMapping(method = RequestMethod.GET, value = "/")
	public String homepage(Model model) {
		model.addAttribute("msg","启动成功!!!");
		System.out.println("****************** 启动成功!!! *****************");
		return "index.html";
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/admin")
	public String adminpage(Model model) {
		model.addAttribute("msg","启动成功!!!");
		System.out.println("****************** 直接进入管理员页面!!! *****************");
		return "administration.html";
	}
	
	

}
