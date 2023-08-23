package net.xiaoqingxin.homeAssetManagement.model;

import java.io.Serializable;
import java.util.Date;


import net.xiaoqingxin.homeAssetManagement.enums.Weight;

/** 价格的单位 */
//@Entity(name="UnitOfPrice")
//@Table(name="unit_of_price")
public class UnitOfPrice implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
//	@Id
//    @GeneratedValue(strategy=GenerationType.IDENTITY)
//    @Column(name="id")
	private short id;

	/** 货币 */
//	@Column(name="currency")
	private String currency = "EURO";
	
	/** 分隔符 */
//	@Column(name="delimiter")
	private char delimiter = '/';
	
	/** 重量或体积 通常为 kg L */
//	@Column(name="weight")
//	@Enumerated(EnumType.STRING)
	private Weight weight;
	
	/** 货币符号 */
//	@Column(name="currency_symbol")
	private char CurrencySymbol = '€';
	
	/** 此条数据创建日期 */
//	@Column(name="creat_date")
	private Date creatDate;
	
	/** 此条数据最后修改日期 */
//	@Column(name="last_modify_date")
	private Date lastModifyDate;
	
	

	public short getId() {
		return id;
	}



	public void setId(short id) {
		this.id = id;
	}



	public String getCurrency() {
		return currency;
	}



	public void setCurrency(String currency) {
		this.currency = currency;
	}



	public char getDelimiter() {
		return delimiter;
	}



	public void setDelimiter(char delimiter) {
		this.delimiter = delimiter;
	}



	public Weight getWeight() {
		return weight;
	}



	public void setWeight(Weight weight) {
		this.weight = weight;
	}



	public char getCurrencySymbol() {
		return CurrencySymbol;
	}



	public void setCurrencySymbol(char currencySymbol) {
		CurrencySymbol = currencySymbol;
	}



	public Date getCreatDate() {
		return creatDate;
	}



	public void setCreatDate(Date creatDate) {
		this.creatDate = creatDate;
	}



	public Date getLastModifyDate() {
		return lastModifyDate;
	}



	public void setLastModifyDate(Date lastModifyDate) {
		this.lastModifyDate = lastModifyDate;
	}



	@Override
	public String toString() {
		return currency + delimiter + weight;
	}
	
	
	

}
