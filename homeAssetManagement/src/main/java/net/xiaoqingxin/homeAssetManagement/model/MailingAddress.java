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

/**  Anschrift */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="MailingAddress")
@Table(name="mailing_address")
public class MailingAddress implements Serializable{
	
	private static final long serialVersionUID = 1L;
	

	/**   */
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
	private Integer id;
	
	/** 名字  */
	@Column(name="vor_name")
	private String vorName;
	
	/** 姓氏  */
	@Column(name="nach_name")
	private String nachName;
	
	/** 街道 Straße  */
	@Column(name="street_name")
	private String streetName;
	
	/** 街道号码  */
	@Column(name="street_number")
	private Short streetNumber;
	
	/** 邮政编码 Postleitzahl  PLZ */
	@Column(name="postal_code")
	private Integer postalCode;
	
	/** Stadt  */
	@Column(name="city")
	private String city;
	
	
	/** 此条数据创建日期 */
	@Column(name="creat_date")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss" )
	private Date creatDate;
	
	/** 此条数据最后修改日期 */
	@Column(name="last_modify_date")
	private Date lastModifyDate;

	
	
	

}
