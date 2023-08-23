package net.xiaoqingxin.homeAssetManagement.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.xiaoqingxin.homeAssetManagement.enums.ContactType;
import net.xiaoqingxin.homeAssetManagement.enums.PayBy;
import net.xiaoqingxin.homeAssetManagement.enums.PaymentMethodEnum;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class PaymentMethod  implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Column(name="pay_by")
	@Enumerated(EnumType.STRING)
	private PayBy payBy;
	
	@Column(name="contact_type")
	@Enumerated(EnumType.STRING)
	private ContactType contactType;
	
	@Column(name="payment_Method_E")
	@Enumerated(EnumType.STRING)
	private PaymentMethodEnum paymentMethodE;

	
	

}
