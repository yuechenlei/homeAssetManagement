package net.xiaoqingxin.homeAssetManagement.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import net.xiaoqingxin.homeAssetManagement.model.CompanyInformation;

@Repository
public interface CompanyInfoRepository extends PagingAndSortingRepository<CompanyInformation, Integer>{
	
	Page<CompanyInformation> findAllByNameLike(String name,Pageable pageable);
	
	Page<CompanyInformation> findAll(Pageable pageable);

}
