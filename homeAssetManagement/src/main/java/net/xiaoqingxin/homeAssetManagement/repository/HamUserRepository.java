package net.xiaoqingxin.homeAssetManagement.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import net.xiaoqingxin.homeAssetManagement.model.HamUser;

@Repository
public interface HamUserRepository extends CrudRepository<HamUser, Long>{
	
	public HamUser findByUsername(String username);

}
