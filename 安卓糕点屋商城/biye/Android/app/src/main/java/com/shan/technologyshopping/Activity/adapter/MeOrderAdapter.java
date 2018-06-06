package com.shan.technologyshopping.Activity.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.shan.technologyshopping.Activity.app.MyApplication;
import com.shan.technologyshopping.Activity.model.GoodsModel;
import com.shan.technologyshopping.R;

import java.util.ArrayList;
import java.util.List;

/**
 * 我的订单列表适配器
 */

public class MeOrderAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    public static final int FOOTER_TYPE = 0;//最后一个的类型
    public static final int HAS_IMG_TYPE = 1;//有图片的类型
    private List<GoodsModel> dataList;

    private Context mContext;

    public MeOrderAdapter(Context context) {
        mContext = context;
        dataList = new ArrayList<>();
    }

    public void addData(List<GoodsModel> list) {
        dataList.addAll(list);
        notifyDataSetChanged();
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        return new AllAddressAdapterViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.item_me_order, parent, false));

    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        bindView((AllAddressAdapterViewHolder) holder, dataList.get(position));
    }


    private void bindView(AllAddressAdapterViewHolder holder, GoodsModel data) {

        Glide
                .with(mContext)
                .load(MyApplication.url + data.getImg())
                .into(holder.img);
        holder.product_name.setText(data.getName());
        holder.product_type.setText(data.getType() + " " + data.getType2());
        holder.product_price.setText("￥ " + data.getPrice());
        holder.product_count.setText("数量：" + data.getCount());
        holder.order_time.setText(data.getOrder_time());

    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }

    public static class AllAddressAdapterViewHolder extends RecyclerView.ViewHolder {

        private ImageView img;
        private TextView product_name;
        private TextView product_type;
        private TextView product_price;
        private TextView product_count;
        private TextView order_time;

        public AllAddressAdapterViewHolder(View itemView) {
            super(itemView);
            img = (ImageView) itemView.findViewById(R.id.item_shooping_car_img);
            product_name = (TextView) itemView.findViewById(R.id.item_shooping_car_title);
            product_type = (TextView) itemView.findViewById(R.id.item_shooping_car_type);
            product_price = (TextView) itemView.findViewById(R.id.item_shooping_car_price);
            product_count = (TextView) itemView.findViewById(R.id.product_count);
            order_time = (TextView) itemView.findViewById(R.id.order_time);

        }
    }

    /**
     * 刷新列表
     */
    public void refreshList(List<GoodsModel> list) {
        dataList.clear();
        dataList.addAll(list);
        notifyDataSetChanged();
    }


}

