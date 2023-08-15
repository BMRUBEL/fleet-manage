<?php
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;
 class Fuel extends CI_Controller
 {
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        // $this->load->database();
        $this->load->model('Fuel_model');
    }

    public function addfuel()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        //    $data['password']=md5($data['password']);
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            // Your section starts here
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            $this->Fuel_model->savefuels($data);
            // $this->Fuel_model->saveexpense($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully Inserted!', 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }

    //----------Fuel -Add End-------

    public function getVehicle()
    {
        $data = $this->Fuel_model->getVehicle();
        $this->output->set_content_type('application/json')->set_output(json_encode(['vehicle' => $data, 'status' => true]));
    }

    public function getDriver()
    {
        $data = $this->Fuel_model->getDriver();
        $this->output->set_content_type('application/json')->set_output(json_encode(['driver' => $data, 'status' => true]));
    }

    public function index()
    {
        $data = $this->Fuel_model->getFuel();
        $this->output->set_content_type('application/json')->set_output(json_encode(['fuels' => $data, 'status' => true]));
    }

  // ----------------Fuel-delete-------Start---
  public function deletefuel()
  {

      $header = apache_request_headers();
      $token = $header['Authorization'];
      try {
          $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
          // Your section starts here
          $data = json_decode(file_get_contents("php://input"), true);
          $d = $this->Fuel_model->deletefuel($data['id']);
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully deleted!', 'status' => true]));
          // Your section ends here
      } catch (ExpiredException $e) {
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
      } catch (SignatureInvalidException $s) {
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
      } catch (Exception $ex) {
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
      }
  }
  // -----------Fuel------delete---End-----

  //----------edit--start-------
  public function editfuel()
  {

      $header = apache_request_headers();
      $token = $header['Authorization'];
      try {
          $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
          // Your section starts here
          $data = json_decode(file_get_contents("php://input"), true);
          $d = $this->Fuel_model->editfuel($data['id']);
          $this->output->set_content_type('application/json')->set_output(json_encode(['fuel' => $d, 'status' => true]));
          // Your section ends here
      } catch (ExpiredException $e) {
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
      } catch (SignatureInvalidException $s) {
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
      } catch (Exception $ex) {
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
      }
  }
  //-----Fuel-----Edit End-------

  //------Fuel----Update End-------
  public function updatefuel()
  {

      $header = apache_request_headers();
      $token = $header['Authorization'];
      try {
          $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
          // Your section starts here
          $data = json_decode(file_get_contents("php://input"), true);
          //    $data['password']=md5($data['password']);
          $this->Fuel_model->updatefuel($data);
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully Updated!', 'status' => true]));
          // Your section ends here
      } catch (ExpiredException $e) {
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
      } catch (SignatureInvalidException $s) {
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
      } catch (Exception $ex) {
          $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
      }
  }
//--------Fuel----update end--------




//---------------Fuel date issu---------

public function fuel_report()
{
  
  $header = apache_request_headers();
  $token=$header['Authorization'];
  try{
      $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
      // Your section starts here
      $data=json_decode(file_get_contents("php://input"),true);
      $d=[];
      if($data['startDate']!=''){
          $std=date_create($data['startDate']);
          $etd=date_create($data['endDate']);
          $int=new DateInterval('P1D');
          $rang=new DatePeriod($std,$int,$etd);
          foreach($rang as $r){
              $t=$this->Fuel_model->get_ful($data['vehicle_id'],$r->format('Y-m-d'));
            
            if ($t != '0') {
                $d[]=$t;
            }
              
          }
      }else{
          $std=date_create(date('Y-m'.'-01'));
          $etd=date_create(date('Y-m-d'));
          $int=new DateInterval('P1D');
          $rang=new DatePeriod($std,$int,$etd);
          foreach($rang as $r){
              $t=$this->Fuel_model->get_ful($data['vehicle_id'],$r->format('Y-m-d'));
              if($t!=0){
                  $d[]=$t;
              }
              
          }         
      }
      
   $this->output->set_content_type('application/json')->set_output(json_encode(['fuelrep'=>$d,'status'=>true]));
      // Your section ends here
  }
  catch(ExpiredException $e){
      $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
  }catch(SignatureInvalidException $s){
      $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
  }catch(Exception $ex){
      $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
  }
}

//Fuel Report Graph-----

public function fuel_graph()
{
 
  $header = apache_request_headers();
  $token = $header['Authorization'];
  try {
      // Your section starts here
      $data = json_decode(file_get_contents("php://input"), true);
      $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));

      $d=[];
      if($data['startDate']!=''){
          $rang = new DatePeriod(
              new DateTime($data['startDate']),
              new DateInterval('P1D'),
              new DateTime($data['endDate'])
         );
          foreach($rang as $r){
              $t=$this->Fuel_model->get_graph($data ['id'],$r->format('Y-m-d'));
              
              if($t->qty!= null && [''] ){
                  $d[]=['date'=>$r->format('Y-m-d'),'qty'=>$t->qty];
              }
              
          } 
      }else{
          $rang = new DatePeriod(
              new DateTime(date('Y-m'.'-01')),
              new DateInterval('P1D'),
              new DateTime(date('Y-m-d'))
         );
          foreach($rang as $r){
              $t=$this->Fuel_model->get_graph($data ['id'],$r->format('Y-m-d'));
              if($t->qty!=null && ['']){
                  $d[]=['date'=>$r->format('Y-m-d'),'qty'=>$t->qty];
              }
              
          }         
      }

      $this->output->set_content_type('application/json')->set_output(json_encode(['graph' => $d, 'status' => true]));
      // Your section ends here
  } catch (ExpiredException $e) {
      $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
  } catch (SignatureInvalidException $s) {
      $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
  } catch (Exception $ex) {
      $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
  }
}


 }
 
