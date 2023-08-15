<?php
class Customers_model extends CI_Model
{
    public function list()
    {
        return $this->db->get('customers')->result();
    }
    public function getCustomer()
    {
        return $this->db->where('role','admin')->get('admin')->result();
    }
    public function savecustomers($data)
    {
        $this->db->insert('admin',['name'=>$data['name'],'email'=>$data['email'],'password'=>$data['password'],'role'=>'users']);
        $last_id=$this->db->insert_id();
        $this->db->insert('customers',['admin_id'=>$last_id,'name'=>$data['name'],'email'=>$data['email'],'phone'=>$data['phone'],'address'=>$data['address'],'status'=>$data['status']]);
    }
    public function deletecustomers($id)
    {
        $this->db->where('id',$id)->delete('admin');
        $this->db->where('admin_id',$id)->delete('customers');
    }
    public function editcustomers($id)
    {
        $this->db->from('customers');
        $this->db->join('admin','customers.admin_id=admin.id');
        return $this->db->where('admin_id',$id)->get()->row();

    }
    public function updatecustomers($data)
    {

        $this->db->where('id',$data['id'])->update('admin',['name'=>$data['name'],'email'=>$data['email'],'password'=>$data['password'],'role'=>'users']);

        $this->db->where('admin_id',$data['id'])->update('customers',['admin_id'=>$data['id'],'name'=>$data['name'],'email'=>$data['email'],'phone'=>$data['phone'],'address'=>$data['address'],'status'=>$data['status']]);
    }
    public function getadmin()
    {
        return $this->db->get('admin')->result();
    }
}
