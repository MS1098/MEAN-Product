import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  isEditMode = false;
  productId: string | null = null;
  loading = false;
  form:any;

 constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode && this.productId) {
      this.loading = true;
      this.productService.getProductById(this.productId).subscribe({
        next: (product: Product) => {
          this.form.patchValue({
            name: product.name,
            price: product.price,
            description: product.description
          });
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = this.form.value as Product;

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
}
