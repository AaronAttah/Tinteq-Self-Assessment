import { ObjectId } from "mongoose";

/**Interfaces */
interface SanitizedVendorServiceQueryParams {
  status?: string;
  user?: string;
  // Add more query parameters if needed
}
interface SanitizedVendorVenueQueryParams {
  status?: string;
  user?: string;

  // Add more query parameters if needed
}

interface SanitizedVendorListingQueryParams {
  location?: ObjectId;
  rating?: string;
  price?: {
    $gte?: number; // is the lower value
    $lte?: number; //  is the higher value
  };
  // price?: {
  //   $elemMatch?: {
  //     price?: {
  //       $gte?: number;
  //       $lte?: number;
  //     };
  //   };
  // };


  availability?: ObjectId;
  vendor_category?: ObjectId;
  status?: string; //set to approveed

  // Add more query parameters if needed
}

interface SanitizedVendorVenueListingQueryParams {
  location?: ObjectId;
  rating?: string;
  price?: {
    $gte?: number; // is the lower value
    $lte?: number; //  is the higher value
  };
  availability?: ObjectId;
  venue_category?: ObjectId;
  status?: string; //set to approveed

  // Add more query parameters if needed
}

/*functions*/

export function sanitizeVendorServiceQueryParams(
  params: SanitizedVendorServiceQueryParams,
  user?: string
): SanitizedVendorServiceQueryParams {
  const sanitizedParams: SanitizedVendorServiceQueryParams = {};

  if (params.status === "approved") {
    sanitizedParams.status = params.status;
    sanitizedParams.user = user;
  }
  if (params.status === "pending") {
    sanitizedParams.status = params.status;
    sanitizedParams.user = user;

  }
  if (params.status === "rejected") {
    sanitizedParams.status = params.status;
    sanitizedParams.user = user;

  }
  if (params.status === "deleted") {
    sanitizedParams.status = params.status;
    sanitizedParams.user = user;

  }
  // Add more conditions for other query parameters if needed

  return sanitizedParams;
}

export function sanitizeVendorVenueQueryParams(
  params: SanitizedVendorVenueQueryParams,
  user?: string

): SanitizedVendorVenueQueryParams {
  const sanitizedParams: SanitizedVendorVenueQueryParams = {};

  if (params.status === "approved") {
    sanitizedParams.status = params.status;
    sanitizedParams.user = user;

  }
  if (params.status === "pending") {
    sanitizedParams.status = params.status;
    sanitizedParams.user = user;

  }
  if (params.status === "rejected") {
    sanitizedParams.status = params.status;
    sanitizedParams.user = user;

  }
  if (params.status === "deleted") {
    sanitizedParams.status = params.status;
    sanitizedParams.user = user;

  }
  // Add more conditions for other query parameters if needed

  return sanitizedParams;
}

export function sanitizeServiceListingQueryParams(
  params: SanitizedVendorListingQueryParams
): SanitizedVendorListingQueryParams {
  const sanitizedParams: SanitizedVendorListingQueryParams = {};

  if (params.location) {
    sanitizedParams.location = params.location;
  }
  if (params.rating) {
    sanitizedParams.rating = params.rating;
  }
  if (params.price) {
    sanitizedParams.price = {
      // $elemMatch: {
      //   price: {}
      // }
    };
    if (params.price.$gte) {
      sanitizedParams.price.$gte = params.price.$gte;
      // sanitizedParams.price.$elemMatch.price.$gte = params.price.$gte;
    }
    if (params.price.$lte) {
      sanitizedParams.price.$lte = params.price.$lte;
      // sanitizedParams.price.$elemMatch.price.$lte = params.price.$lte;
    }
  }

  if (params.availability) {
    sanitizedParams.availability = params.availability;
  }
  if (params.vendor_category) {
    sanitizedParams.vendor_category = params.vendor_category;
  }
  // Add more conditions for other query parameters if needed

  return sanitizedParams;
}

export function sanitizeVenueListingQueryParams(
  params: SanitizedVendorVenueListingQueryParams
): SanitizedVendorVenueListingQueryParams {
  const sanitizedParams: SanitizedVendorVenueListingQueryParams = {};

  if (params.location) {
    sanitizedParams.location = params.location;
  }
  if (params.rating) {
    sanitizedParams.rating = params.rating;
  }
  if (params.price) {
    sanitizedParams.price = {};
    if (params.price.$gte) {
      sanitizedParams.price.$gte = params.price.$gte;
    }
    if (params.price.$lte) {
      sanitizedParams.price.$lte = params.price.$lte;
    }
  }

  if (params.availability) {
    sanitizedParams.availability = params.availability;
  }
  if (params.venue_category) {
    sanitizedParams.venue_category = params.venue_category;
  }
  // Add more conditions for other query parameters if needed

  return sanitizedParams;
}
