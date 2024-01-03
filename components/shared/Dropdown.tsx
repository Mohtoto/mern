import React, { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Category, { ICategory } from "../../lib/database/models/category.model";
import { Input } from "../ui/input";
import { createCategory, getAllCategrories } from "../../lib/actions/category.actions";

type DropDownProps = {
  value?: string;
  onChangeHandler: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropDownProps) => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim(),
    }).then((categrory) => {

      console.log(categrory);
      
      setCategories((prevState) => [...prevState, categrory]); //add a new a category to an empty array through spread operator
    });
  };



  useEffect(() => {
    const getCategories =async () => {
        const categoriesList = await getAllCategrories()

        //if categoriesList exist we wanna setCatergoris to categories List the new list we have 
        categoriesList && setCategories(categoriesList as ICategory[])
    }

    getCategories();

  },[])




  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((catgory) => (
            <SelectItem
              key={catgory._id}
              value={catgory._id}
              className="select-item p-regular-14"
            >
              {catgory.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new Category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type={"text"}
                  placeholder={"Category name"}
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
