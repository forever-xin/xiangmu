package com.shan.technologyshopping.Activity.homefragment;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.shan.technologyshopping.Activity.activity.LoginActivity;
import com.shan.technologyshopping.Activity.activity.DIngdanActivity;
import com.shan.technologyshopping.R;

import static android.content.Context.MODE_PRIVATE;

/**
 * 我的中心界面
 */

public class FragmentMe extends android.support.v4.app.Fragment {

    private TextView userName, userPhone;
    private RelativeLayout meOrder, exit;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_me, null);
        userName = (TextView) view.findViewById(R.id.fr_me_user_name);
        userPhone = (TextView) view.findViewById(R.id.fr_me_user_phone);
        meOrder = (RelativeLayout) view.findViewById(R.id.fr_me_me_order);
        exit = (RelativeLayout) view.findViewById(R.id.fr_me_exit);

        meOrder.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {
                startActivity(new Intent(getActivity(), DIngdanActivity.class));
            }
        });



        exit.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View view) {
                SharedPreferences sharedPreferences = getActivity().getSharedPreferences("user",
                        MODE_PRIVATE);

                SharedPreferences.Editor editor = sharedPreferences.edit();
                //用putString的方法保存数据
                editor.putString("phone", "null");
                editor.putString("pwd", "null");
                editor.putString("name", "null");
                //提交当前数据
                editor.apply();
                Toast.makeText(getActivity(), "退出成功", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(getActivity(), LoginActivity.class);
                startActivity(intent);
                getActivity().finish();
            }
        });

        return view;
    }

    @Override
    public void onResume() {


        SharedPreferences pref = getActivity().getSharedPreferences("user", MODE_PRIVATE);
        String _user_phone = pref.getString("phone", "null");
        String _user_name = pref.getString("name", "null");
        userName.setText(_user_name);
        userPhone.setText(_user_phone);


        super.onResume();
    }
}
















