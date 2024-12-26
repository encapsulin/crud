package com.encaps.api;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApiService {

    public ApiService(){    }


//    List<CategoryDto> findCategParents(Integer categId) {
//        var list = serviceC.getCategoryParents(categId);
//        return list.stream().map(e-> CategoryDto.map(e))
//                .collect(Collectors.toList());
//    }
//
//    List<CategoryDto> findCategoryChildrenTree(Integer categId) {
//        var list = serviceC.findCategsTreeForRoot(categId);
//        findCategoryChildrenTreeItems(list);
//        return list;
//    }
//
//    private void findCategoryChildrenTreeItems(List<CategoryDto> list){
//        for(CategoryDto dtoCateg: list){
//            findCategoryChildrenTreeItems(dtoCateg.getChildren());
//
//            var listItemEntity = serviceI.findAllByCategoryId(dtoCateg.getId());
//            var listItemDto = listItemEntity.stream()
//                            .map(e-> ItemDto.map(e, dtoCateg.getId()))
//                                    .collect(Collectors.toList());
//            dtoCateg.setItemsList(listItemDto);
//
//            int cnt = listItemDto.size();
//
//            for(CategoryDto dtoChild: dtoCateg.getChildren()){
//                cnt += dtoChild.getItems();
//            }
//            dtoCateg.setItems(cnt);
//
//        }
//    }
//
//    // TODO
//    List<CategoryDto> findCategoryChildrenPlain(Integer categId) {
//        var list = serviceC.findCategsTreeForRoot(categId);
//        return serviceC.transformTreeToPlainList(list);
//    }
//
//    // TODO map entity to DTO?
//    List<ItemEntity> findItemsFromCategoryAndAllNestedSubcategories(Integer categId) {
//        var listItems = new ArrayList<ItemEntity>();
//
//        listItems.addAll(serviceI.findAllByCategoryId(categId));
//
//        var listTree = serviceC.findCategsTreeForRoot(categId);
//        var listPlain = serviceC.transformTreeToPlainList(listTree);
//
//        listPlain.forEach(c -> {
//            listItems.addAll(serviceI.findAllByCategoryId(c.getId()));
//        });
//
//        return listItems;
//    }
//
//    List<CategoryDto> countItemsForCategs(List<CategoryDto> list){
//
//        for(CategoryDto dto: list){
//            dto.setItems(serviceI.findAllByCategoryId(dto.getId()).size());
//            countItemsForCategs(dto.getChildren());
//        }
//        return list;
//    }

}
