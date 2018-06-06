package com.shan.technologyshopping.Activity.adapter;

import android.app.Dialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.Request;
import com.shan.technologyshopping.Activity.app.MyApplication;
import com.shan.technologyshopping.Activity.model.GoodsModel;
import com.shan.technologyshopping.R;
import com.zhy.http.okhttp.OkHttpUtils;
import com.zhy.http.okhttp.callback.StringCallback;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import static android.content.Context.MODE_PRIVATE;

/**
 * 购物车列表适配器
 */

public class LaundryAdapter extends BaseAdapter {
    private Context context;
    private List<GoodsModel> list;
    private View fragment_laundry_item1;
    private ImageView isvisibility;
    private TextView fr_laundry_num;
    private TextView fragment_laundry_feesnum;
    private final int ITEM = 0;
    private final int ITEM1 = 1;
    private final int ITEMSUM = 2;
    private int currentType;
    private Button fragment_laundry_pay;
    private int sum = 1;
    private GoodsModel goodsModel;
    private int SumAmounts;
    private Dialog setUserDetailsDialog;

    public LaundryAdapter(Context context, List<GoodsModel> list, View fragment_laundry_item1, ImageView isvisibility) {
        this.context = context;
        this.list = list;
        this.fragment_laundry_item1 = fragment_laundry_item1;
        this.isvisibility = isvisibility;
    }

    @Override
    public int getCount() {
        if (list.size() == 0) {
            isvisibility.setVisibility(View.VISIBLE);
            return 0;
        } else {
            return list.size() + 1;
        }
    }

    @Override
    public int getItemViewType(int position) {
        //count 是说我购物车里面有多少个商品，10  position 是位置  0-9  ,其实我还有10 结算按钮
        int conut = list.size();
        if (position < conut) {
            return ITEM;
        } else {
            return ITEM1;
        }
    }

    @Override
    public int getViewTypeCount() {
        return ITEMSUM;
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        View mCourseView = null;
        currentType = getItemViewType(position);
        if (currentType == ITEM1) {
            convertView = fragment_laundry_item1;
            fragment_laundry_feesnum = (TextView) convertView.findViewById(R.id.fragment_laundry_feesnum);

            int price = 0;
            for (int i = 0; i < MyApplication.washJavas.size(); i++) {
                price += Integer.parseInt(MyApplication.washJavas.get(i).getPrice()) *
                        Integer.parseInt(MyApplication.washJavas.get(i).getCount());
            }
            fragment_laundry_feesnum.setText(price + "");

            fragment_laundry_pay = (Button) convertView.findViewById(R.id.fragment_laundry_pay);
            fragment_laundry_pay.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    showSetPayPwdDialog(context);

                }
            });
        } else {
            mCourseView = convertView;
            mCourseView = View.inflate(context, R.layout.fragment_gouwuchexs, null);
            ImageView fr_laundry_clothes = (ImageView) mCourseView.findViewById(R.id.fr_laundry_clothes);
            TextView fr_laundry_font = (TextView) mCourseView.findViewById(R.id.fr_laundry_font);
            fr_laundry_num = (TextView) mCourseView.findViewById(R.id.fr_laundry_num);
            TextView fr_laundry_amounts = (TextView) mCourseView.findViewById(R.id.fr_laundry_amounts);
            ImageView fr_laundry_remove = (ImageView) mCourseView.findViewById(R.id.fr_laundry_remove);
            ImageView fr_laundry_cuts = (ImageView) mCourseView.findViewById(R.id.fr_laundry_cuts);
            ImageView fr_laundry_plus = (ImageView) mCourseView.findViewById(R.id.fr_laundry_plus);
            goodsModel = list.get(position);
            fr_laundry_cuts.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int text = Integer.parseInt(MyApplication.washJavas.get(position).getCount());
                    if (text > 1) {
                        list.get(position).setCount((text - 1) + "");
                        MyApplication.washJavas.get(position).setCount((text - 1) + "");
                        // LaundryAdapter.this.notifyDataSetChanged();
                    }

                    LaundryAdapter.this.notifyDataSetChanged();
                }
            });
            fr_laundry_plus.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int text = Integer.parseInt(MyApplication.washJavas.get(position).getCount());
                    list.get(position).setCount((text + 1) + "");
                    MyApplication.washJavas.get(position).setCount((text + 1) + "");
                    LaundryAdapter.this.notifyDataSetChanged();
                }
            });
            fr_laundry_remove.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    list.remove(position);
                    LaundryAdapter.this.notifyDataSetChanged();
                }
            });

            Glide
                    .with(context)
                    .load(list.get(position).getImg())
                    .into(fr_laundry_clothes);

            fr_laundry_font.setText(goodsModel.getName());
            if (goodsModel.getCount() == null) {
                fr_laundry_num.setText("1");
            } else {
                fr_laundry_num.setText(goodsModel.getCount());
            }

            fr_laundry_amounts.setText(goodsModel.getPrice());
            convertView = mCourseView;
        }
        return convertView;
    }

    private void showSetPayPwdDialog(Context mContext) {


        SharedPreferences pref = context.getSharedPreferences("user", MODE_PRIVATE);
        String user_id = pref.getString("phone", "null");
        String user_name = pref.getString("name", "null");

        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < MyApplication.washJavas.size(); i++) {
            JSONObject object = new JSONObject();
            try {
                object.put("user_id", user_id);
                object.put("user_name", user_name);
                object.put("user_phone", "");
                object.put("user_address", "");

                object.put("product_id", MyApplication.washJavas.get(i).getId());
                object.put("product_name", MyApplication.washJavas.get(i).getName());
                object.put("product_price", MyApplication.washJavas.get(i).getPrice());
                object.put("product_count", MyApplication.washJavas.get(i).getCount());
                object.put("product_img", MyApplication.washJavas.get(i).getImg());
                object.put("product_type", MyApplication.washJavas.get(i).getType() + " " +
                        MyApplication.washJavas.get(i).getType2() + " " +
                        MyApplication.washJavas.get(i).getType3());

            } catch (JSONException e) {
                e.printStackTrace();
            }
            jsonArray.put(object);
        }

        OkHttpUtils
                .postString()
                .url(MyApplication.url + "add_order_list")
                .content(jsonArray.toString())
                .mediaType(MediaType.parse("application/json; charset=utf-8"))
                .build()
                .execute(new StringCallback() {
                    @Override
                    public void onError(Request request, Exception e) {

                    }

                    @Override
                    public void onResponse(String response) {
                        MyApplication.washJavas = new ArrayList<GoodsModel>();
                        list.clear();
                        LaundryAdapter.this.notifyDataSetChanged();

                    }
                });
    }
}


