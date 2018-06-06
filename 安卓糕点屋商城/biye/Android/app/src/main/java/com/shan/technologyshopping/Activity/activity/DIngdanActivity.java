package com.shan.technologyshopping.Activity.activity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import com.squareup.okhttp.Request;
import com.shan.technologyshopping.Activity.adapter.MeOrderAdapter;
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

/**
 * 我的订单
 */

public class DIngdanActivity extends AppCompatActivity {

    private RecyclerView recyclerView;

    @Override protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_me_dingdan);
        recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        final MeOrderAdapter adapter = new MeOrderAdapter(this);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        recyclerView.setAdapter(adapter);

        SharedPreferences pref = getSharedPreferences("user", MODE_PRIVATE);
        String user_id = pref.getString("phone", "null");

        OkHttpUtils
                .get()
                .url(MyApplication.url + "get_order_list")
                .addParams("unumber", user_id)
                .build()
                .execute(new StringCallback() {
                    @Override
                    public void onError(Request request, Exception e) {
                        Toast.makeText(DIngdanActivity.this, "获取订单失败", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONArray jsonArray = new JSONArray(response);
                            List<GoodsModel> list = new ArrayList<GoodsModel>();

                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject object = jsonArray.getJSONObject(i);
                                GoodsModel goodsModel = new GoodsModel(
                                        object.optString("id"),
                                        object.optString("items"),
                                        object.optString("product_img"),
                                        object.optString("price"),
                                        object.optString("product_type").split(" ")[0],
                                        object.optString("product_type").split(" ")[1],
                                        "",
                                        object.optString("count"));
                                goodsModel.setOrder_time(object.optString("order_date"));
                                list.add(goodsModel);
                            }

                            adapter.refreshList(list);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                });


    }
}
