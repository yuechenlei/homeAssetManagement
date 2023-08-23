package net.xiaoqingxin.homeAssetManagement.beans;

import java.io.Serializable;

import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailingAddressQueryBean implements Serializable{

	private static final long serialVersionUID = 1L;
	
	/** 名字  */
	@Nullable
	private String name;
	
	/** 街道 Straße  */
	@Nullable
	private String streetName;
	
	/** 邮政编码 Postleitzahl  PLZ */
	@Nullable
	private Integer postalCode;
	
	/** Stadt  */
	@Nullable
	private String city;
	
	/** 页码 */
	@Nullable
	private Integer page = 1;
	
	/** 每页数量 */
	@Nullable
	private Integer size = 10;
	
	@Nullable
	private String[] sort;
	

}
