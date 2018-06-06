package com.shan.technologyshopping.Activity.model;

/**
 * 商品的模板类
 */
public class GoodsModel {

    private String id;
    private String name;
    private String img;
    private String price;
    private String type;
    private String type2;
    private String type3;
    private String count;

    private String order_time;

    private boolean isShouCang;

    public boolean isShouCang() {
        return isShouCang;
    }

    public void setShouCang(boolean shouCang) {
        isShouCang = shouCang;
    }



    public GoodsModel(String id, String name, String img, String price, String type, String type2,String type3,String count) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.type = type;
        this.type2 = type2;
        //this.type2 = type3;
        this.count = count;
    }

    public String getId() {

        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType2() {
        return type2;
    }

    public void setType2(String type2) {
        this.type2 = type2;
    }

    public String getType3() {
        return type3;
    }

    public void setType3(String type3) {
        this.type3 = type3;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public String getOrder_time() {
        return order_time;
    }

    public void setOrder_time(String order_time) {
        this.order_time = order_time;
    }
}
