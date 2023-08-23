package net.xiaoqingxin.homeAssetManagement.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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

import net.xiaoqingxin.homeAssetManagement.beans.Paged;
import net.xiaoqingxin.homeAssetManagement.beans.Paging;
import net.xiaoqingxin.homeAssetManagement.beans.ReceiptQueryBean;
import net.xiaoqingxin.homeAssetManagement.model.Receipt;
import net.xiaoqingxin.homeAssetManagement.repository.ReceiptRepository;

@Service
public class ReceiptQueryService {
	
	private ReceiptRepository receiptRepository;

	@Autowired
	public ReceiptQueryService(ReceiptRepository receiptRepository) {
		super();
		this.receiptRepository = receiptRepository;
	}
	
	/** 获取分页信息
	 *  @param pageNumber 当前页码
	 *  @param size 每页数量
	 *  @param receiptQueryBean 查询bean
	 *   */
	public Paged<Receipt> getPage(int pageNumber, int size,ReceiptQueryBean receiptQueryBean) {
		// 从第1页开始,显示10条,根据id升序排列
        PageRequest request = PageRequest.of(pageNumber - 1, size, Sort.by("id").ascending());
        
        Page<Receipt> receiptPage = receiptRepository.findAll(getSpecification(receiptQueryBean),request);
        
        return new Paged<Receipt>(receiptPage, Paging.of(receiptPage.getTotalPages(), pageNumber, size));
    }
	
	/** 新增或更新
	 *  @param receipt 
	 *   */
	public Receipt saveOrUpdate(Receipt receipt) {
		
		// Save
		if (null == receipt.getId()) {
			return receiptRepository.save(receipt);
		}
		
		Optional<Receipt> optional = receiptRepository.findById(receipt.getId());
		// Save
		if (!optional.isPresent()) {
			return receiptRepository.save(receipt);
		}
		
		// Update
		Receipt realReceipt = optional.get();
		
		realReceipt.setRealName(receipt.getRealName());
		realReceipt.setPackName(receipt.getPackName());
		realReceipt.setProductName(receipt.getProductName());
		realReceipt.setQuantity(receipt.getQuantity());
		realReceipt.setWeight(receipt.getWeight());
		realReceipt.setUnitPrice(receipt.getUnitPrice());
		realReceipt.setTotalPrice(receipt.getTotalPrice());
		realReceipt.setUnitOfPrice(receipt.getUnitOfPrice());
		if (null != receipt.getTaxType()) {
			realReceipt.setTaxType(receipt.getTaxType());
		}
		realReceipt.setVat(receipt.getVat());
		if (null != receipt.getTaxNumber()) {
			realReceipt.setTaxNumber(receipt.getTaxNumber());
		}
		if (null != receipt.getCoupon()) {
			realReceipt.setCoupon(receipt.getCoupon());
		}
		if (null != receipt.getDiscount()) {
			realReceipt.setDiscount(receipt.getDiscount());
		}
		if (null != receipt.getPayBack()) {
			realReceipt.setPayBack(receipt.getPayBack());
		}
		if (null != receipt.getSubCategory()) {
			realReceipt.setSubCategory(receipt.getSubCategory());
		}
		if (null != receipt.getCategory()) {
			realReceipt.setCategory(receipt.getCategory());
		}
		realReceipt.setMarketName(receipt.getMarketName());
		realReceipt.setCustomerReceiptId(receipt.getCustomerReceiptId());
		realReceipt.setMailingAddressId(receipt.getMailingAddressId());
		realReceipt.setCompanyInformationId(receipt.getCompanyInformationId());
		realReceipt.setTransactionDate(receipt.getTransactionDate());
		
		if (null != receipt.getCreatDate()) {
			realReceipt.setCreatDate(receipt.getCreatDate());
		}
		realReceipt.setLastModifyDate(new Date());
		receipt = null;
		
		return receiptRepository.save(realReceipt);
	}
	
	/** Jpa 动态查询  */
	private Specification<Receipt> getSpecification(ReceiptQueryBean receiptQueryBean){
		
		return new Specification<Receipt>() {

			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<Receipt> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> andPredicates = new ArrayList<Predicate>();
				List<Predicate> orPredicates = new ArrayList<Predicate>();
				
				String category = receiptQueryBean.getCategory();
				String subCategory = receiptQueryBean.getSubCategory();
				String name = receiptQueryBean.getName();
				BigDecimal totalPriceX = receiptQueryBean.getTotalPriceX();
				BigDecimal totalPriceD = receiptQueryBean.getTotalPriceD();
				Character taxType = receiptQueryBean.getTaxType();
				Date transactionDateStart = receiptQueryBean.getTransactionDateStart();
				Date transactionDateEnd = receiptQueryBean.getTransactionDateEnd();
				
				if(StringUtils.hasText(subCategory)) {
					andPredicates.add(criteriaBuilder.equal(root.get("subCategory"),subCategory));
				}else if (StringUtils.hasText(category)) {
					andPredicates.add(criteriaBuilder.equal(root.get("category"),category));
				}
				
				if (StringUtils.hasText(name)) {
					orPredicates.add(criteriaBuilder.equal(root.get("realName"),name));
					orPredicates.add(criteriaBuilder.equal(root.get("packName"),name));
					orPredicates.add(criteriaBuilder.equal(root.get("productName"),name));
				}
				
				if (null != totalPriceX && StringUtils.hasText(totalPriceX.toString())) {
					andPredicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("totalPrice"), totalPriceX));
				}
				
				if (null != totalPriceD && StringUtils.hasText(totalPriceD.toString())) {
					andPredicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("totalPrice"), totalPriceD));
				}
				
				if (null!=taxType && StringUtils.hasText(taxType.toString())) {
					andPredicates.add(criteriaBuilder.equal(root.get("taxType"),taxType));
				}
				
				if (null != transactionDateStart && StringUtils.hasText(transactionDateStart.toString())) {
					andPredicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("transactionDate"), transactionDateStart));
				}
				
				if (null != transactionDateEnd && StringUtils.hasText(transactionDateEnd.toString())) {
					andPredicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("transactionDate"), transactionDateEnd));
				}
				
				if (!orPredicates.isEmpty()) {
					Predicate orPredicate = criteriaBuilder.or(orPredicates.toArray(new Predicate[orPredicates.size()]));
					andPredicates.add(orPredicate);
				}
				return criteriaBuilder.and(andPredicates.toArray(new Predicate[andPredicates.size()]));
			}
		};
	}

}
