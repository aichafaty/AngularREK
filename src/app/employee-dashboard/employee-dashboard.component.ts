import { Component, OnInit } from '@angular/core';
import {ApiService} from "../shared/api.service";
import {FormBuilder,FormGroup} from "@angular/forms";
import {EmployeeDashboardModel} from "./employee-dashboard.model";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formvalue!:FormGroup;
  employeData!: any;
  employeeDashboardModelObj:EmployeeDashboardModel=new EmployeeDashboardModel();
  constructor(private formbuilber:FormBuilder,
              private api :ApiService) { }

  ngOnInit(): void {
    this.formvalue=this.formbuilber.group(
      {
        nom:[''],
        prenom:[''],
        adresse:[''],
        phone:[''],
        email:[''],
        password:[''],
        salaire:['']

      }
    )
    this.getAllEmplyee();

  }
   postEmployeeDetail(){
    this.employeeDashboardModelObj.nom=this.formvalue.value.nom;
    this.employeeDashboardModelObj.prenom=this.formvalue.value.prenom;
    this.employeeDashboardModelObj.adresse=this.formvalue.value.adresse;
    this.employeeDashboardModelObj.phone=this.formvalue.value.phone;
    this.employeeDashboardModelObj.email=this.formvalue.value.email;
    this.employeeDashboardModelObj.salaire=this.formvalue.value.salaire;
    this.employeeDashboardModelObj.password=this.formvalue.value.password;

    this.api.postEmploye(this.employeeDashboardModelObj)
      .subscribe(res=>{
        console.log(res)
        alert("employer ajouter");
        let ref=document.getElementById("annuler")
        ref?.click();
        this.formvalue.reset();
      },
        error => {
        alert("rien ne marche frere");
        })
   }
   getAllEmplyee(){
    this.api.getEmploye()
      .subscribe(res=>{
        this.employeData=res;
      })

   }
  deleteEmploye(id:any){
    this.api.deleteEmploye(id)
      .subscribe(res=>{
        alert("Voulez vou vraiment supprimer")
        this.ngOnInit();
      })
  }
  editEmploye(employe:any){
   // alert("id" +employe.id);
    this.employeeDashboardModelObj.id=employe.id;
    this.formvalue.controls['nom'].setValue(employe.nom);
    this.formvalue.controls['prenom'].setValue(employe.prenom);
    this.formvalue.controls['adresse'].setValue(employe.adresse);
    this.formvalue.controls['phone'].setValue(employe.phone);
    this.formvalue.controls['email'].setValue(employe.email);
    this.formvalue.controls['salaire'].setValue(employe.salaire);
    this.formvalue.controls['password'].setValue(employe.password);

  }
  updateEmploye(){
    this.employeeDashboardModelObj.nom=this.formvalue.value.nom;
    this.employeeDashboardModelObj.prenom=this.formvalue.value.prenom;
    this.employeeDashboardModelObj.adresse=this.formvalue.value.adresse;
    this.employeeDashboardModelObj.phone=this.formvalue.value.phone;
    this.employeeDashboardModelObj.email=this.formvalue.value.email;
    this.employeeDashboardModelObj.salaire=this.formvalue.value.salaire;
    this.employeeDashboardModelObj.password=this.formvalue.value.password;

    this.api.updateEmploye(this.employeeDashboardModelObj,this.employeeDashboardModelObj.id)
      .subscribe(res=>{
        console.log(res)
        alert("update successuf");
        let ref=document.getElementById("annuler")
        ref?.click();
        this.formvalue.reset();
      })
  }

}
