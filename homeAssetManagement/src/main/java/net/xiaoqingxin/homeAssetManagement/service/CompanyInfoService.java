package net.xiaoqingxin.homeAssetManagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import net.xiaoqingxin.homeAssetManagement.beans.Paged;
import net.xiaoqingxin.homeAssetManagement.beans.Paging;
import net.xiaoqingxin.homeAssetManagement.model.CompanyInformation;
import net.xiaoqingxin.homeAssetManagement.repository.CompanyInfoRepository;

@Service
public class CompanyInfoService {
	
	
	private CompanyInfoRepository companyInfoRepository;

	@Autowired
	public CompanyInfoService(CompanyInfoRepository companyInfoRepository) {
		super();
		this.companyInfoRepository = companyInfoRepository;
	}
	
	
	/** 获取分页信息
	 *  @param pageNumber 当前页码
	 *  @param size 每页数量
	 *  @param receiptQueryBean 查询bean
	 *   */
	public Paged<CompanyInformation> getPage(int pageNumber, int size,String  name) {
		
        PageRequest request = PageRequest.of(pageNumber - 1, size, Sort.by("id").ascending());
        
        Page<CompanyInformation> companyInfoPage;
        
        if (!"null".equals(name) && StringUtils.hasText(name)) {
        	companyInfoPage = companyInfoRepository.findAllByNameLike(name,request);
		}else {
			companyInfoPage = companyInfoRepository.findAll(request);
		}
        
        
        return new Paged<CompanyInformation>(companyInfoPage, Paging.of(companyInfoPage.getTotalPages(), pageNumber, size));
    }
	

}
