package com.shan.technologyshopping.Activity.homefragment;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ListView;

import com.shan.technologyshopping.Activity.adapter.LaundryAdapter;
import com.shan.technologyshopping.Activity.app.MyApplication;
import com.shan.technologyshopping.R;


/**
 * 购物车界面
 */
public class FragmentShoppingCar extends android.support.v4.app.Fragment {
    private ListView fg_laundry_list;
    private ImageView fr_laundry_back;
    private ImageView isvisibility;
    private View view;
    private View fragment_laundry_item1;
    private LaundryAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_gouwuche, null);

        fr_laundry_back = (ImageView) view.findViewById(R.id.fr_laundry_back);
        isvisibility = (ImageView) view.findViewById(R.id.isvisibility);

        return view;
    }

    /**
     * 用作判断的购物车的界面是显示还是不显示
     * 根据MyApplication里面的静态集合来判断。集合有数据就显示，没有数据就不显示
     */
    @Override
    public void setUserVisibleHint(boolean isVisible) {
        if (isVisible) {
            if (MyApplication.washJavas.size() == 0 && fg_laundry_list != null) {
                isvisibility.setVisibility(View.VISIBLE);
            } else if (MyApplication.washJavas.size() != 0) {
                fg_laundry_list = (ListView) view.findViewById(R.id.fg_laundry_list);
                fragment_laundry_item1 = View.inflate(getActivity(), R.layout.fragment_zongjia, null);
                adapter = new LaundryAdapter(getActivity(), MyApplication.washJavas, fragment_laundry_item1, isvisibility);
                fg_laundry_list.setAdapter(adapter);
                isvisibility.setVisibility(View.INVISIBLE);

            }
        }
        if (MyApplication.washJavas != null && adapter != null) {
            adapter.notifyDataSetChanged();
        }
    }
}
