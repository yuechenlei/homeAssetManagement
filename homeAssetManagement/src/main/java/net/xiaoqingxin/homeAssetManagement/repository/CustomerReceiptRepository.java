package net.xiaoqingxin.homeAssetManagement.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import net.xiaoqingxin.homeAssetManagement.model.CustomerReceipt;

@Repository
public interface CustomerReceiptRepository extends PagingAndSortingRepository<CustomerReceipt, Long>,
                                                   JpaSpecificationExecutor<CustomerReceipt> {

}
