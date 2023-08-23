package net.xiaoqingxin.homeAssetManagement.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import net.xiaoqingxin.homeAssetManagement.model.MailingAddress;

@Repository
public interface MailingAddressRepository extends PagingAndSortingRepository<MailingAddress, Integer>,
                                                  JpaSpecificationExecutor<MailingAddress>{

}
