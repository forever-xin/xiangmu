package com.shan.technologyshopping.Activity.fragment;

import android.content.SharedPreferences;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.squareup.okhttp.Request;
import com.shan.technologyshopping.Activity.adapter.WashGridviewAdapter;
import com.shan.technologyshopping.Activity.app.MyApplication;
import com.shan.technologyshopping.Activity.model.GoodsModel;
import com.shan.technologyshopping.R;
import com.zhy.http.okhttp.OkHttpUtils;
import com.zhy.http.okhttp.callback.StringCallback;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

import static android.content.Context.MODE_PRIVATE;

/**
 * 所有产品面包界面
 */

public class FragmentMianbao extends Fragment implements View.OnClickListener{
    private ImageView xing;
    private int mPosition;
    private GridView fr_wash;
    private List<GoodsModel> list;
    private PopupWindow window;
    private ImageView fr_page_cuts;
    private ImageView fr_page_plus;
    private ImageView fr_page_picture;
    private Button fr_page_sure;
    private TextView fr_page_amounts;
    private TextView fr_page_num;
    private TextView fr_page_bag;
    private GoodsModel goodsModel;
    private TextView describe;
    private int i = 1;
    private int positionCount;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_cloth, null);
        fr_wash = (GridView) view.findViewById(R.id.fr_wash_summer);
        initPopouWindow();
        fr_wash.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                showPopouWindo(position);
                if (null != window && window.isShowing()) {
                    window.dismiss();
                } else {
                    window.showAtLocation(fr_wash, Gravity.BOTTOM, 10, 10);
                }
            }
        });


        OkHttpUtils
                .get()
                .url(MyApplication.url + "get_cloth_list")
                .addParams("type", "面包")
                .build()
                .execute(new StringCallback() {
                    @Override
                    public void onError(Request request, Exception e) {

                    }

                    @Override
                    public void onResponse(String response) {

                        list = new ArrayList<GoodsModel>();
                        try {
                            JSONArray jsonArray = new JSONArray(response);
                            for (int i = 0; i < jsonArray.length(); i++) {
                                GoodsModel model = new GoodsModel(jsonArray.getJSONObject(i).optString("id"),
                                        jsonArray.getJSONObject(i).optString("items"),
                                        MyApplication.url + jsonArray.getJSONObject(i).optString("picture"),
                                        jsonArray.getJSONObject(i).optString("price"),
                                        jsonArray.getJSONObject(i).optString("describe").split(" ")[0],
                                        jsonArray.getJSONObject(i).optString("describe").split(" ")[1],
                                       " ",""
                                );
                                list.add(model);
                            }


                        } catch (JSONException e) {

                            e.printStackTrace();
                        }
                        fr_wash.setAdapter(new WashGridviewAdapter(getActivity(), list));


                    }
                });


        return view;
    }


    /**
     * 初始化一些数据，根据传进来的下标来判断显示什么图片什么内容。
     *
     * @param
     */
    private void initPopouWindow() {
        View view = LayoutInflater.from(getActivity()).inflate(R.layout.fragment_page_shangpinxiangqing, null);
        window = new PopupWindow(view, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, true);
        window.setFocusable(true);// 加上这个popupwindow中的ListView才可以接收点击事件
        ColorDrawable dw = new ColorDrawable(0xb0000000);
        //设置SelectPicPopupWindow弹出窗体的背景
        window.setBackgroundDrawable(dw);
        window.setOutsideTouchable(true);// 触摸popup
        fr_page_picture = (ImageView) view.findViewById(R.id.fr_page_picture);
        fr_page_bag = (TextView) view.findViewById(R.id.fr_page_bag);
        fr_page_amounts = (TextView) view.findViewById(R.id.fr_page_amounts);
        fr_page_cuts = (ImageView) view.findViewById(R.id.fr_page_cuts);
        fr_page_num = (TextView) view.findViewById(R.id.fr_page_num);
        fr_page_plus = (ImageView) view.findViewById(R.id.fr_page_plus);
        fr_page_sure = (Button) view.findViewById(R.id.fr_page_sure);
        describe = (TextView) view.findViewById(R.id.describe);

        xing = (ImageView) view.findViewById(R.id.xing);
        xing.setOnClickListener(this);

        fr_page_cuts.setOnClickListener(FragmentMianbao.this);
        fr_page_num.setOnClickListener(FragmentMianbao.this);
        fr_page_plus.setOnClickListener(FragmentMianbao.this);
        fr_page_sure.setOnClickListener(FragmentMianbao.this);
    }

    private void showPopouWindo(int position) {
        mPosition = position;
        if (list.get(position).isShouCang()) {

            xing.setBackgroundResource(R.drawable.rc_ic_star_hover);
        } else {
            xing.setBackgroundResource(R.drawable.rc_ic_star);

        }
        this.positionCount = position;
        fr_page_amounts.setText(list.get(position).getPrice());

        fr_page_bag.setText(list.get(position).getName());
        describe.setText(list.get(position).getType() + " " +
                list.get(position).getType2() + " ");

        Glide
                .with(getActivity())
                .load(list.get(position).getImg())
                .into(fr_page_picture);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.fr_page_cuts:
                String jian = (String) fr_page_num.getText();
                int sum = Integer.parseInt(jian);
                if (sum > i) {
                    fr_page_num.setText(sum - 1 + "");
                }
                break;
            case R.id.fr_page_num:
                break;
            case R.id.fr_page_plus:
                String jia = (String) fr_page_num.getText();
                sum = Integer.parseInt(jia);
                if (sum >= i) {
                    fr_page_num.setText(sum + 1 + "");
                }
                break;
            case R.id.fr_page_sure:

                if (null != window && window.isShowing()) {
                    Boolean isRepeat = isRepeatData();
                    String name = (String) fr_page_bag.getText();
                    if (isRepeat) {
                        for (int wash = 0; wash < MyApplication.washJavas.size(); wash++) {
                            goodsModel = MyApplication.washJavas.get(positionCount);
                            if (name.equals(goodsModel.getName())) {
                                String str1 = goodsModel.getCount();
                                int a1 = Integer.parseInt(str1);
                                String str2 = (String) fr_page_num.getText();
                                int a2 = Integer.parseInt(str2);
                                goodsModel.setCount((a1 + a2) + "");
                                break;
                            }
                        }
                    } else {
                        list.get(positionCount).setCount(fr_page_num.getText().toString());
                        MyApplication.washJavas.add(list.get(positionCount));
                    }
                    Toast.makeText(getActivity(), "加入到购物车成功", Toast.LENGTH_SHORT).show();
                    fr_page_num.setText("1");
                    window.dismiss();
                }
                break;

            case R.id.xing:
                String type = "";
                if (list.get(mPosition).isShouCang()) {
                    xing.setBackgroundResource(R.drawable.rc_ic_star);
                    type = "0";
                    list.get(positionCount).setShouCang(false);


                } else {
                    xing.setBackgroundResource(R.drawable.rc_ic_star_hover);
                    type = "1";
                    list.get(positionCount).setShouCang(true);

                }


                SharedPreferences pref = getActivity().getSharedPreferences("user", MODE_PRIVATE);
                String user_id = pref.getString("phone", "null");
                OkHttpUtils
                        .get()
                        .url(MyApplication.url + "shoucang")
                        .addParams("user_phone", user_id)
                        .addParams("product_id", list.get(mPosition).getId())
                        .addParams("shoucang", type)

                        .build()
                        .execute(new StringCallback() {
                            @Override
                            public void onError(Request request, Exception e) {

                            }

                            @Override
                            public void onResponse(String response) {

                            }


                        });


                break;
        }
    }

    /**
     * 判断是否有重复的数据
     *
     * @param
     */
    private Boolean isRepeatData() {
        String name = (String) fr_page_bag.getText();
        for (int i = 0; i < MyApplication.washJavas.size(); i++) {
            goodsModel = MyApplication.washJavas.get(i);
            if (name.equals(goodsModel.getName())) {
                return true;
            }
        }
        return false;
    }

}
