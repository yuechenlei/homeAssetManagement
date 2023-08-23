package net.xiaoqingxin.homeAssetManagement.beans;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptQueryBean implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Nullable
	private String category;
	
	@Nullable
	private String subCategory;
	
	@Nullable
	private String name;
	
	@Nullable
	private BigDecimal totalPriceX;
	
	@Nullable
	private BigDecimal totalPriceD;
	
	@Nullable
	private Character taxType;
	
	@Nullable
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private Date transactionDateStart;
	
	@Nullable
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private Date transactionDateEnd;
	
	/** 页码 */
	private Integer page = 1;
	
	/** 每页数量 */
	private Integer size = 10;
	
	@Nullable
	private String[] sort;

	private Boolean showMain = true;
	

}
