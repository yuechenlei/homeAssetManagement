package net.xiaoqingxin.homeAssetManagement.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Kundenbeleg  */
@Entity(name="CustomerReceipt")
@Table(name="customer_receipt")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerReceipt implements Serializable{

	private static final long serialVersionUID = 1L;
	
	/**   */
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
	private Long id;
	
	/** 终端ID 可唯一标识一笔交易 TerminalId */
	@Column(name="terminal_id")
	private Long terminalId;
	
	/** Pos-Info  */
	@Column(name="pos_info")
	private String posInfo;
	
	/** 交易码 Transaktionsnummer TA-Nr Trace-Nr.*/
	@Column(name="transaction_number")
	private String transactionNumber;
	
	/** 单据编码 Bon-Nr. Belegnummer BNr*/
	@Column(name="receipt_number")
	private Integer receiptNumber;
	
	/** 收银台号码 Kasse  */
	@Column(name="checkout_counter")
	private Byte checkoutCounter;
	
	/** 收银员编码 Bedienung  */
	@Column(name="cashier")
	private Integer cashier;
	
	/** 卡号 账户标识 Kartennummer Kontonummer PAN */
	@Column(name="card_number")
	private String cardNumber;
	
	/** 卡序列号 Kartenfolgenummer Karte */
	@Column(name="card")
	private Byte card;
	
	/** 支付方式 Bezahlverfahren  */
	@Embedded
	private PaymentMethod paymentMethod;
	
	/** 交易金额 Betrag  */
	@Column(name="amount")
	private BigDecimal amount;
	
	/** 价格单位  */
	@Column(name="unit_of_price")
	private String unitOfPrice = "Euro";
	
	/** 芯片数据 Chipbezogene Daten  EMV-AID  EMV-Daten*/
	@Column(name="emv_aid")
	private String chipData;
	
	/** 签约公司编号 VU-Nr Vertragsunternehmensnummer  */
	@Column(name="vu_nr")
	private Long contractor;
	
	/** 授权码 Genehmigungsnummer Autorisierungsnummer*/
	@Column(name="authorization_number")
	private String authorizationNumber;
	
	/** 超市名字 */
	@Column(name="market_name")
	private String marketName;
	
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
