<?php
class Partsin_model extends CI_Model
{

    public function save_stock($data)
    {
        return $this->db->insert('parts_stock_in', $data);
    }

    public function list()
    {
        $this->db->select('`parts`.`id`, `parts`.`name`,`parts_stock_in`.*');
        $this->db->from('parts');
        $this->db->join('`parts_stock_in`','`parts`.`id`=`parts_stock_in`.`parts_id`');
        return $this->db->get()->result();
    }

    public function partName()
    {
        return $this->db->get('parts')->result();
    }

    
    
    
    public function getOne_stock($id)
    {
        // $this->db->select('`parts`.`id`, `parts`.`name`,`parts_stock_in`.*');
        // $this->db->from('parts');
        // $this->db->join('`parts_stock_in`','`parts`.`id`=`parts_stock_in`.`parts_id`');
        // $this->db->where('parts_stock_in.id', $id);
        // return $this->db->get()->row();
        return $this->db->where('id',$id)->get('parts_stock_in')->row();
    }

    public function update_stock_in($data)
    {
        return $this->db->where('id',$data['id'])->update('parts_stock_in', $data);
    }
    
    public function delete_stock($id)
    {
        $this->db->where('id',$id)->delete('parts_stock_in');
    }
}
