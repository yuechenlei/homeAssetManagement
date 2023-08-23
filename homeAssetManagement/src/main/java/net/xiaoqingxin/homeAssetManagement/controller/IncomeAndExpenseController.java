package net.xiaoqingxin.homeAssetManagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/incomeAndExpense")
public class IncomeAndExpenseController {
	
	@RequestMapping("/toIncomeAndExpense")
	public String toIncomeAndExpense(Model model) {
		model.addAttribute("msg","启动成功!!!");
		return "/incomeAndExpense/incomeAndExpense-index.html";
	}

}
