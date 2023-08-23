package net.xiaoqingxin.homeAssetManagement.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * 小票 Kassenbon Kassenzettel
 *
 */
@Entity(name="Receipt")
@Table(name="receipt")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Receipt implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
	private Long id;

	/** 日常分类称呼的名字 */
	@Column(name="real_name")
	private String realName;
	
	/** 产品包装上的名字 */
	@Column(name="pack_name")
	private String packName;
	
	/** 小票上打印的名字 */
	@Column(name="product_name")
	private String productName;
	
	/** 购买的数量 */
	@Column(name="quantity")
	private Short quantity;
	
	/** 重量 */
	@Column(name="weight")
	private BigDecimal weight;
	
	/** 单价 */
	@Column(name="unit_price")
	private BigDecimal unitPrice;
	
	/** 总价 */
	@Column(name="total_price")
	private BigDecimal totalPrice;
	
	/** 价格的单位 */
	@Column(name="unit_of_price")
	private String unitOfPrice;
	
	/** 税率类型  A=19.0% B=7.0% C=7.0% */
	@Column(name="tax_type")
	private Character taxType;
	
	/** 增值税 Mehrwertsteuer value-added tax */
	@Column(name="vat")
	private BigDecimal vat;
	
	/** Steuer-Nr Steuer-ID*/
	@Column(name="tax_number")
	private String taxNumber;
	
	/** 优惠劵 Coupon-Ersparnisse */
	@Column(name="coupon")
	private BigDecimal coupon;
	
	/** 打折促销活动 Aktion  Rabatt */
	@Column(name="discount")
	private BigDecimal discount;
	
	/** 会员积分反馈卡 */
	@Column(name="pay_back")
	private BigDecimal payBack;
	
	/** 子类别 */
	@Column(name="sub_category")
	// @Enumerated(EnumType.STRING)
	private String subCategory;
	
	/** 类别 */
	@Column(name="category")
	private String category;
	
	/** 超市名字 */
	@Column(name="market_name")
	private String marketName;
	
	/** 客户单据Id KundenbelegId */
	@Column(name="customer_receipt_id")
	private Long customerReceiptId;
	
	/** 通信地址Id Anschrift */
	@Column(name="mailing_address_id")
	private Integer mailingAddressId;
	
	/** 公司信息Id  */
	@Column(name="company_information_id")
	private Integer companyInformationId;
	
	/** 账单交易日期 */
	@Column(name="transaction_date")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss" )
	private Date transactionDate;
	
	/** 此条数据创建日期 */
	@Column(name="creat_date")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss" )
	private Date creatDate;
	
	/** 此条数据最后修改日期 */
	@Column(name="last_modify_date")
	private Date lastModifyDate;
	
	
	
	

}
