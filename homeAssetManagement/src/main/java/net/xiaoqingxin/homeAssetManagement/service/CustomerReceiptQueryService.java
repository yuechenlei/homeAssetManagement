package net.xiaoqingxin.homeAssetManagement.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import net.xiaoqingxin.homeAssetManagement.beans.CustomerReceiptQueryBean;
import net.xiaoqingxin.homeAssetManagement.beans.Paged;
import net.xiaoqingxin.homeAssetManagement.beans.Paging;
import net.xiaoqingxin.homeAssetManagement.enums.PaymentMethodEnum;
import net.xiaoqingxin.homeAssetManagement.model.CustomerReceipt;
import net.xiaoqingxin.homeAssetManagement.repository.CustomerReceiptRepository;

@Service
public class CustomerReceiptQueryService {
	
	private CustomerReceiptRepository crRepository;

	@Autowired
	public CustomerReceiptQueryService(CustomerReceiptRepository crRepository) {
		super();
		this.crRepository = crRepository;
	}
	
	/** 获取分页信息
	 *  @param pageNumber 当前页码
	 *  @param size 每页数量
	 *  @param receiptQueryBean 查询bean
	 *   */
	public Paged<CustomerReceipt> getPage(int pageNumber, int size,CustomerReceiptQueryBean crQueryBean) {
		
        PageRequest request = PageRequest.of(pageNumber - 1, size, Sort.by("id").ascending());
        
        Page<CustomerReceipt> crPage = crRepository.findAll(getSpecification(crQueryBean),request);
        
        return new Paged<CustomerReceipt>(crPage, Paging.of(crPage.getTotalPages(), pageNumber, size));
    }
	
	/** Jpa 动态查询  */
	private Specification<CustomerReceipt> getSpecification(CustomerReceiptQueryBean crQueryBean){
		
		return new Specification<CustomerReceipt>() {

			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<CustomerReceipt> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> andPredicates = new ArrayList<Predicate>();
				
				String marketName = crQueryBean.getMarketName();
				Long terminalId = crQueryBean.getTerminalId();
				PaymentMethodEnum paymentMethodE = crQueryBean.getPaymentMethodE();
				BigDecimal amountV = crQueryBean.getAmountV();
				BigDecimal amountB = crQueryBean.getAmountB();
				Date transactionDateStart = crQueryBean.getTransactionDateStart();
				Date transactionDateEnd = crQueryBean.getTransactionDateEnd();
				
				if(StringUtils.hasText(marketName)) {
					andPredicates.add(criteriaBuilder.equal(root.get("marketName"),marketName));
				}
				
				if(null!=terminalId && StringUtils.hasText(terminalId.toString())) {
					andPredicates.add(criteriaBuilder.equal(root.get("terminalId"),terminalId));
				}
				
				if(null!=paymentMethodE && StringUtils.hasText(paymentMethodE.toString())) {
					andPredicates.add(criteriaBuilder.equal(root.get("paymentMethod").get("paymentMethodE"),paymentMethodE));
				}
				
				
				if (null != amountV && StringUtils.hasText(amountV.toString())) {
					andPredicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("amount"), amountV));
				}
				
				if (null != amountB && StringUtils.hasText(amountB.toString())) {
					andPredicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("amount"), amountB));
				}
				
				if (null != transactionDateStart && StringUtils.hasText(transactionDateStart.toString())) {
					andPredicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("transactionDate"), transactionDateStart));
				}
				
				if (null != transactionDateEnd && StringUtils.hasText(transactionDateEnd.toString())) {
					andPredicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("transactionDate"), transactionDateEnd));
				}
				
				return criteriaBuilder.and(andPredicates.toArray(new Predicate[andPredicates.size()]));
			}
		};
	}

}
