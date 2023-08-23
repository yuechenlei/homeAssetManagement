package net.xiaoqingxin.homeAssetManagement.beans;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** 对spring的Page进一步封装，提供给页面分页数据 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Paged<T> {
	
	private Page<T> page;

    private Paging paging;

}
