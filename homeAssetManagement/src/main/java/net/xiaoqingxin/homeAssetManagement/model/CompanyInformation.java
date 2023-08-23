package net.xiaoqingxin.homeAssetManagement.model;

import java.io.Serializable;
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

/**  Gesellschaft Information */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="CompanyInformation")
@Table(name="company_information")
public class CompanyInformation implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	/**   */
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
	private Integer id;
	
	/** 企业名字 Vollständiger Name */
	@Column(name="name")
	private String name;
	
	/** 电子记录系统的技术安全装置
	 *  TSE Transaktionsnummer Fiskalinformation 
	 *  Technische Sicherheitseinrichtung für elektronische Aufzeichnungssysteme
	 * */
	@Column(name="tse_transaktions_number")
	private Integer tse;
	
	/**  Signaturzähler der Kasse bzw. Sicherheitsmoduls  TSE签名计数器*/
	@Column(name="signature_counter")
	private Integer signatureCounter;
	
	/**  计算机结账系统的序列号
	 *   Seriennummer.Kasse  SN-Kasse 
	 *   Seriennummer bei computergestützten Kassensystemen
	 * */
	@Column(name="series_number")
	private String seriesNumber;
	
	/** 销售税识别号 UST-ID-NR  UmSt-ID.Nr.  Umsatzsteuer Identifikationsnummer */
	@Column(name="ust_id")
	private String ust;
	
	/** Telefon */
	@Column(name="telephone_number")
	private String telephoneNumber;
	
	@Column(name="web_site")
	private String webSite;
	
	/** Öffnungszeiten  */
	@Column(name="open_time")
	private String openTime;
	
	/** 通信地址Id Anschrift */
	@Column(name="mailing_address_id")
	private Integer mailingAddressId;
	
	/** 此条数据创建日期 */
	@Column(name="creat_date")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss" )
	private Date creatDate;
	
	/** 此条数据最后修改日期 */
	@Column(name="last_modify_date")
	private Date lastModifyDate;

	

}
