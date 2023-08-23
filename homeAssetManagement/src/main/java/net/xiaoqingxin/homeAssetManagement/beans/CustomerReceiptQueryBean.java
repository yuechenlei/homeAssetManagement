package net.xiaoqingxin.homeAssetManagement.beans;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.xiaoqingxin.homeAssetManagement.enums.PaymentMethodEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerReceiptQueryBean implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Nullable
	private String marketName;
	
	@Nullable
	private Long terminalId;
	
	@Nullable
	@Enumerated(EnumType.STRING)
	private PaymentMethodEnum paymentMethodE;
	
	@Nullable
	private BigDecimal amountV;
	
	@Nullable
	private BigDecimal amountB;
	
	@Nullable
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private Date transactionDateStart;
	
	@Nullable
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private Date transactionDateEnd;
	
	/** 页码 */
	@Nullable
	private Integer page = 1;
	
	/** 每页数量 */
	@Nullable
	private Integer size = 10;
	
	@Nullable
	private String[] sort;

}
