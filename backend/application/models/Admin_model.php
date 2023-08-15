<?php
class Admin_model extends CI_Model
{
    public function login($data)
    {
       return $this->db->where(['email'=>$data['email'],'password'=>md5($data['password'])])->get('admin')->row();
    }
}
